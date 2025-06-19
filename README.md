Mav Links - Ferramenta de Auditoria de Links

Este script utiliza Node.js e Puppeteer para escanear um site, extrair links e verificar seus status.
🚀 Instalação

Pré-requisito: Você precisa ter o Node.js (versão LTS) instalado.
1.Abra o Terminal.

2.Atualize seus pacotes:

    sudo apt update
3.Instale o Node.js e o npm:

    sudo apt install nodejs npm
Instalação do pacote:

    git clone https://github.com/Mavcg/MavLink


Entre na pasta do projeto:
Bash

    cd mav-links


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
