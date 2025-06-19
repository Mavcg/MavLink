Claro. Aqui está uma versão básica e direta para o seu README.md, contendo apenas as seções de "Como Instalar" e "Como Usar", pronta para copiar e colar.
Mav Links - Ferramenta de Auditoria de Links

Este script utiliza Node.js e Puppeteer para escanear um site, extrair links e verificar seus status.
🚀 Instalação

Pré-requisito: Você precisa ter o Node.js (versão LTS) instalado.

    Clone o repositório:
    Bash

git clone https://github.com/seu-usuario/mav-links.git

(Substitua seu-usuario/mav-links pelo seu repositório no GitHub)

Entre na pasta do projeto:
Bash

cd mav-links

Instale as dependências:
(Este comando instala o Puppeteer e o navegador Chromium necessário para ele rodar)
Bash

    npm install

⚙️ Como Usar

A ferramenta é operada via linha de comando. Para ver todas as opções e exemplos, execute o comando de ajuda:
Bash

node mavLinks.js -h

Exemplos de Uso

    Fazer uma varredura simples (apenas links internos):
    Bash

node mavLinks.js --url=https://www.example.com

Capturar TODOS os links (internos e externos):
Bash

node mavLinks.js --url=https://www.example.com --all-links

Acelerar a varredura com 10 verificações ao mesmo tempo:
Bash

    node mavLinks.js --url=https://www.example.com --concurrency=10

Após a execução, uma nova pasta será criada com o nome do site (ex: www.example.com), contendo os screenshots, o PDF e um relatório .csv com os resultados dos links.
