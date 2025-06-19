# MavLink
Generator Link
Mav Links - Auditor de Links e Ferramenta de Reconhecimento Web

Uma ferramenta de linha de comando, construída com Node.js e Puppeteer, para realizar reconhecimento inicial em websites. O script automatiza a tarefa de extrair links, verificar seus status, gerar relatórios e capturar evidências visuais.

Ideal para pesquisadores de segurança em programas de bug bounty, analistas de SEO ou desenvolvedores que precisam auditar a saúde de um site.
✨ Funcionalidades Principais (Features)

    Navegação e Captura de Página: Gera um PDF da página alvo, um screenshot da página inteira e um screenshot focado na primeira área visível (1920x1080).
    Extração de Links: Coleta todos os links de uma página, com a opção de filtrar apenas por links internos (comportamento padrão) ou capturar todos (incluindo externos) com a flag --all-links.
    Auditoria de Links Concorrente: Verifica o status de múltiplos links em paralelo para máxima performance e velocidade, com número de "workers" configurável.
    Relatório Estruturado: Salva todos os links e seus status (OK, BROKEN, REDIRECT, UNREACHABLE) em um arquivo .csv para fácil análise em planilhas.
    Organização Automática: Cria uma pasta dedicada para cada site alvo, mantendo todos os resultados (imagens, PDF, CSV) devidamente organizados.
    Interface Flexível: Uso simples e direto via linha de comando com flags para configurar a execução.

📋 Pré-requisitos

Para executar este script, você precisará ter o Node.js instalado em seu sistema.

    Node.js: (Versão 16 ou superior recomendada). Você pode baixar a versão LTS (Long Term Support) em nodejs.org. O npm (Node Package Manager) já vem incluído na instalação.

🚀 Instalação

    Clone o repositório:
    Bash

git clone https://github.com/seu-usuario/mav-links.git

(Substitua seu-usuario/mav-links pelo caminho real do seu repositório no GitHub)

Navegue até a pasta do projeto:
Bash

cd mav-links

Instale as dependências:
Este comando irá instalar o Puppeteer e baixar a versão correspondente do navegador Chromium.
Bash

    npm install

⚙️ Como Usar

A ferramenta é operada através da linha de comando. Você pode ver todas as opções disponíveis rodando o comando de ajuda:
Bash

node mavLinks.js -h

Isso exibirá a seguinte mensagem:

  Uso: node mavLinks.js --url=<URL> [OPÇÕES]

  Ferramenta de scraping e auditoria de links que organiza os resultados em pastas.

  Opções:
    --url=<URL>         (Obrigatório) A URL completa do site para escanear.
    --concurrency=<NUM> (Opcional)    Número de links para verificar em paralelo (padrão: 5).
    --all-links         (Opcional)    Extrai todos os links (internos e externos). Por padrão, extrai apenas os internos.
    -h, --help          Mostra esta mensagem de ajuda.

Exemplos de Uso

    Varredura padrão (somente links internos):
    Bash

node mavLinks.js --url=https://www.example.com

Varredura capturando TODOS os links (internos e externos):
Bash

node mavLinks.js --url=https://www.example.com --all-links

Varredura mais rápida com 10 verificações paralelas:
Bash

    node mavLinks.js --url=https://www.example.com --concurrency=10

📂 Saída (Output)

Para cada site escaneado, uma nova pasta será criada com o nome do domínio (ex: www.example.com). Dentro dela, você encontrará:

    www.example.com_full.png: Screenshot da página completa.
    www.example.com_viewport.png: Screenshot da área visível inicial (1920x1080).
    www.example.com.pdf: Um PDF da página.
    www.example.com_link_report.csv: O relatório em CSV com todos os links encontrados e seus status.

📜 Licença

Distribuído sob a licença MIT. Veja LICENSE para mais informações.

&lt;br>
Mav Links - Web Reconnaissance & Link Auditor Tool (English Version)

A command-line tool built with Node.js and Puppeteer to perform initial reconnaissance on websites. The script automates the task of extracting links, checking their status, generating reports, and capturing visual evidence.

Ideal for security researchers in bug bounty programs, SEO analysts, or developers who need to audit a site's health.
✨ Key Features

    Page Navigation & Capture: Generates a PDF of the target page, a full-page screenshot, and a focused screenshot of the initial viewport (1920x1080).
    Link Extraction: Gathers all links from a page, with the option to filter for internal links only (default behavior) or capture all links (including external) using the --all-links flag.
    Concurrent Link Auditing: Checks the status of multiple links in parallel for maximum performance and speed, with a configurable number of "workers".
    Structured Reporting: Saves all found links and their statuses (OK, BROKEN, REDIRECT, UNREACHABLE) to a .csv file for easy analysis in any spreadsheet software.
    Automatic Organization: Creates a dedicated folder for each target site, keeping all results (images, PDF, CSV) neatly organized.
    Flexible Interface: Simple and direct command-line usage with flags to configure the execution.

📋 Prerequisites

To run this script, you will need Node.js installed on your system.

    Node.js: (Version 16 or higher recommended). You can download the LTS (Long Term Support) version at nodejs.org. npm (Node Package Manager) is included in the installation.

🚀 Installation

    Clone the repository:
    Bash

git clone https://github.com/your-username/mav-links.git

(Replace your-username/mav-links with the actual path to your GitHub repository)

Navigate to the project folder:
Bash

cd mav-links

Install dependencies:
This command will install Puppeteer and download the corresponding version of the Chromium browser.
Bash

    npm install

⚙️ Usage

The tool is operated via the command line. You can see all available options by running the help command:
Bash

node mavLinks.js -h

Usage Examples

    Standard scan (internal links only):
    Bash

node mavLinks.js --url=https://www.example.com

Scan capturing ALL links (internal and external):
Bash

node mavLinks.js --url=https://www.example.com --all-links

Faster scan with 10 concurrent checks:
Bash

    node mavLinks.js --url=https://www.example.com --concurrency=10

📂 Output

For each scanned site, a new folder will be created named after the domain (e.g., www.example.com). Inside it, you will find:

    www.example.com_full.png: Full-page screenshot.
    www.example.com_viewport.png: Screenshot of the initial visible area (1920x1080).
    www.example.com.pdf: A PDF of the page.
    www.example.com_link_report.csv: The CSV report with all found links and their statuses.

📜 License

Distributed under the MIT License. See LICENSE for more information.
