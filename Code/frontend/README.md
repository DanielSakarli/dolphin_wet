# Frontend

This is an Ionic project built with Vue.js.

It is recommended to use VSCode as editor and install [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=vue.vscode-typescript-vue-plugin) and [Vue Language Features](https://marketplace.visualstudio.com/items?itemName=vue.volar) in VSCode for better development experience. Otherwise you will run into a VSCode bug saying `Cannot find module './App.vue' or its corresponding type declarations.ts(2307)`.

## Prerequisites

Before you can run the frontend, you must have the following software installed on your computer:

- Node.js and NPM
- Ionic CLI
- Capacitor CLI

## Installation

1. Clone this repository to your local machine

2. In you terminal, first enter the frontend directory using:

```bash
cd tiergarten-nuernberg/Code/Frontend
```

3. Run `npm install` to install all dependencies

```bash
npm install
```

## Development and Preview

To start a development server, run `ionic serve`. This will start the development server and open the app in your default browser.

```bash
# In the folder Frontend, run
npm install
```

## Building

## Testing

To run unit tests, run `npm run test`. This will run the unit tests using Vitest.

To run end-to-end tests, run `npm run test:e2e`. This will run the end-to-end tests using Cypress.

## Linting and Formatting

To lint the code, run `npm run lint`. This will check for any syntax or style errors.

To automatically fix linting errors, run `npm run lint:fix`.

To format the code using Prettier, run `npm run format`.

## Technologies Used

- Ionic Vue
- Vue.js
- Vue Router
- Capacitor
- Vite
- Cypress
- Vitest
- ESLint
- Prettier
