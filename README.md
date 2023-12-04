# GeoPixel



## Contrução do proejto:

- [nodejs](https://nodejs.org/en)
- [ejs](https://ejs.co/)
- [typescript](https://www.typescriptlang.org/)
- [jest](https://jestjs.io/pt-BR/)
- [cypress](https://www.cypress.io/)

## Deploy da aplicação: 
[black-hare-cap.cyclic.app/](https://black-hare-cap.cyclic.app/?cityName=S%C3%A3o+Paulo)

## Como Clonar
```bash
git git@github.com:dhiegopereira/geopixel.git
cd geopixel
```

## Como Instalar
```bash
npm install
```

## Configuração das Variáveis de Ambiente
Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes variáveis de ambiente:

```env
GOOGLE_API_KEY=
WEATHER_API_KEY=
HTTP_WEB_PORT=3000
```

## Como Executar
### Desenvolvimento
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000` por padrão.

### Produção
```bash
npm run build
npm start
```

A aplicação será executada em segundo plano em `http://localhost:3000`. Certifique-se de ter o ambiente configurado corretamente.

## Testes com Jest
```bash
npm run jest
```

## Testes com Cypress
```bash
npm run cypress
```

Isso abrirá a interface do Cypress, onde você pode executar os testes interativos ou usar comandos npm para executar testes de cabeça no modo de linha de comando.
