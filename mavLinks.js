// USO:
// node mavLinks.js --url=<URL> [OPÇÕES]
// Para ver todos os comandos e exemplos, rode: node mavLinks.js -h

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// --- Função para exibir a mensagem de ajuda ---
function showHelp() {
    console.log(`
  Uso: node mavLinks.js --url=<URL> [OPÇÕES]

  Ferramenta de scraping e auditoria de links que organiza os resultados em pastas.

  Opções:
    --url=<URL>         (Obrigatório) A URL completa do site para escanear.
    --concurrency=<NUM> (Opcional)    Número de links para verificar em paralelo (padrão: 5).
    --all-links         (Opcional)    Extrai todos os links (internos e externos). Por padrão, extrai apenas os internos.
    -h, --help          Mostra esta mensagem de ajuda.

  Exemplos:
    # Varredura padrão (só links internos)
    node mavLinks.js --url=https://www.example.com

    # Varredura capturando TODOS os links (internos e externos)
    node mavLinks.js --url=https://www.example.com --all-links
  `);
}

// --- Função para processar os argumentos da linha de comando ---
function getArgs() {
    const args = {};
    process.argv.slice(2).forEach(arg => {
        if (arg.startsWith('--')) {
            const [key, value] = arg.substring(2).split('=');
            args[key] = value !== undefined ? value : true;
        }
    });
    return args;
}

// --- Verificação Inicial dos Argumentos ---
const rawArgs = process.argv;
if (rawArgs.length <= 2 || rawArgs.includes('-h') || rawArgs.includes('--help')) {
    showHelp();
    process.exit(0);
}

// --- Função Principal ---
(async () => {
    console.log("\n███╗   ███╗ █████╗ ██╗   ██╗     ██╗  ██╗██╗███╗   ██╗ ██████╗ ██╗  ██╗");
    console.log("████╗ ████║██╔══██╗██║   ██║     ██║  ██║██║████╗  ██║██╔════╝ ██║ ██╔╝");
    console.log("██╔████╔██║███████║██║   ██║     ██║  ██║██║██╔██╗ ██║██║  ███╗█████╔╝ ");
    console.log("██║╚██╔╝██║██╔══██║╚██╗ ██╔╝     ╚██╗██╔╝██║██║╚██╗██║██║   ██║██╔═██╗ ");
    console.log("██║ ╚═╝ ██║██║  ██║ ╚████╔╝       ╚███╔╝ ██║██║ ╚████║╚██████╔╝██║  ██╗");
    console.log("╚═╝     ╚═╝╚═╝  ╚═╝  ╚═══╝         ╚══╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝\n");

    const args = getArgs();
    let targetUrl = args.url;
    const CONCURRENCY = parseInt(args.concurrency, 10) || 5;

    if (!targetUrl) {
        showHelp();
        process.exit(1);
    }
    if (!targetUrl.startsWith('http')) {
        targetUrl = `https://${targetUrl}`;
    }

    const urlObject = new URL(targetUrl);
    const origin = urlObject.origin;
    const hostname = urlObject.hostname;

    const outputDir = path.join(__dirname, hostname);
    if (!fs.existsSync(outputDir)) {
        console.log(`Criando diretório de resultados: ./${hostname}/`);
        fs.mkdirSync(outputDir);
    }
    const reportFileName = path.join(outputDir, `${hostname}_link_report.csv`);

    console.log('Iniciando o navegador...');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();

    try {
        await page.setViewport({ width: 1920, height: 1080 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36');

        console.log(`Navegando para a página principal: ${targetUrl}...`);
        await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });

        console.log(`Gerando arquivos de reconhecimento na pasta "${hostname}"...`);
        await page.screenshot({ path: path.join(outputDir, `${hostname}_full.png`), fullPage: true });
        await page.pdf({ path: path.join(outputDir, `${hostname}.pdf`), format: 'A4' });
        await page.screenshot({
            path: path.join(outputDir, `${hostname}_viewport.png`),
            clip: { x: 0, y: 0, width: 1920, height: 1080 }
        });

        const allLinksFromPage = await page.$$eval('a', anchors => anchors.map(a => a.href));
        
        // <<< LÓGICA ATUALIZADA AQUI >>>
        let linksToScan;
        if (args['all-links']) {
            console.log('\nExtraindo TODOS os links (internos e externos)...');
            // Filtra apenas para remover links vazios/nulos
            linksToScan = allLinksFromPage.filter(href => href);
        } else {
            console.log(`\nExtraindo apenas links internos de ${origin}...`);
            // Comportamento padrão: filtra por links internos
            linksToScan = allLinksFromPage.filter(href => href && href.startsWith(origin));
        }
        const uniqueLinks = [...new Set(linksToScan)];
        // <<< FIM DA LÓGICA ATUALIZADA >>>

        console.log(`Total de ${uniqueLinks.length} links únicos para escanear. Iniciando verificação com concorrência de ${CONCURRENCY}.`);

        fs.writeFileSync(reportFileName, 'URL,StatusCode,Status\n');

        const linkChunks = [];
        for (let i = 0; i < uniqueLinks.length; i += CONCURRENCY) {
            linkChunks.push(uniqueLinks.slice(i, i + CONCURRENCY));
        }

        for (let i = 0; i < linkChunks.length; i++) {
            console.log(`Processando lote ${i + 1} de ${linkChunks.length}...`);
            const promises = linkChunks[i].map(async link => {
                let status = 'OK';
                let statusCode = 200;
                let page_ = null;
                try {
                    page_ = await browser.newPage();
                    await page_.setRequestInterception(true);
                    page_.on('request', (req) => {
                        if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
                            req.abort();
                        } else {
                            req.continue();
                        }
                    });
                    const response = await page_.goto(link, { waitUntil: 'domcontentloaded', timeout: 20000 });
                    statusCode = response.status();
                    if (statusCode >= 400) status = 'BROKEN';
                    else if (statusCode >= 300 && statusCode < 400) status = 'REDIRECT';
                } catch (error) {
                    status = 'UNREACHABLE';
                    statusCode = 'N/A';
                } finally {
                    if (page_) await page_.close();
                }
                return { link, statusCode, status };
            });

            const results = await Promise.all(promises);
            let csvContent = '';
            results.forEach(res => {
                console.log(`[${res.status} ${res.statusCode}] ${res.link}`);
                csvContent += `"${res.link}","${res.statusCode}","${res.status}"\n`;
            });
            fs.appendFileSync(reportFileName, csvContent);
        }

        console.log(`\nVerificação concluída! Relatório salvo em: ${reportFileName}`);

    } catch (error) {
        console.error('\nOcorreu um erro crítico durante a execução:', error);
    } finally {
        await browser.close();
        console.log('Navegador fechado.');
    }
})();