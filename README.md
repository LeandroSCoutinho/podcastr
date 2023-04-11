# Podcastr
O Podcastr é o melhor lugar para ouvir seus podcasts favoritos :D  

Este projeto foi criado com base na NLW#5, um workshop online organizado pela Rocketseat 🚀  

## Prévia

![podcastr]()

## 🎶 Sobre
O Podcastr é uma aplicação para ouvir podcasts, com funcionalidades como reprodução, pausa e seleção de episódios. Ele foi criado utilizando o framework Next.js, que permite criar páginas com renderização do lado do servidor (SSR) ou estáticas (SSG), e foi escrito em TypeScript.  

## 🎤 Tecnologias
### O Podcastr utiliza as seguintes tecnologias:  

Next.js: o melhor framework para criar páginas SSR ou SSG  
TypeScript: linguagem utilizada para escrever o código  
Axios: biblioteca para trabalhar com requisições HTTP baseadas em Promises  
Date-fns: biblioteca para trabalhar com datas em JavaScript  
RC-Slider: biblioteca para criar o controle deslizante da faixa de áudio  
SASS: pré-processador CSS para otimizar o desempenho do CSS  
JSON Server: biblioteca para criar uma API de servidor fake  
Também foi criado um script personalizado para executar o JSON Server com um atraso simulado:  

```json
"server": "json-server src/service/server.json -w -d 750 -p 3333"
```

## 📝 Start
Antes de começar, é necessário ter instalado:  

Node.js. Você pode baixá-lo aqui: https://nodejs.org  
GIT. Você pode baixá-lo aqui: https://git-scm.com  
Depois de instalar essas dependências, abra o terminal e execute os seguintes comandos:  

```bash
git clone https://github.com/LeandroSCoutinho/podcastr.git
cd podcastr

npm install

# ou

yarn
```
Para iniciar o servidor, execute o seguinte comando em um terminal:  
 
```bash
yarn dev  
```
Em outro terminal, inicie o JSON Server:  

```bash
yarn server
```
Para testar a funcionalidade SSR ou SSG, é necessário criar uma versão otimizada do projeto. Para fazer isso, execute o seguinte comando:   

```bash
yarn build
```
Depois de criar a versão otimizada, execute o seguinte comando para testar a aplicação:  

```bash
yarn start
```
Pronto! Agora você pode ouvir seus podcasts favoritos no Podcastr.  
