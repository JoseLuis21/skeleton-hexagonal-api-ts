# SKELETON API TS HEXAGONAL

[![npm version](https://img.shields.io/badge/npm-10.3.0-brightgreen.svg)](https://www.npmjs.com/package/npm)

### Dependencies

- [![fastify](https://img.shields.io/badge/fastify-4.25.2-brightgreen.svg)](https://www.npmjs.com/package/fastify)
- [![@fastify/cors](https://img.shields.io/badge/@fastify/cors-8.5.0-brightgreen.svg)](https://www.npmjs.com/package/@fastify/cors)
- [![@prisma/client](https://img.shields.io/badge/@prisma/client-5.8.1-brightgreen.svg)](https://www.npmjs.com/package/@prisma/client)
- [![zod](https://img.shields.io/badge/zod-3.22.4-brightgreen.svg)](https://www.npmjs.com/package/zod)

### Development dependencies

- [![@types/node](https://img.shields.io/badge/@types/node-20.11.5-brightgreen.svg)](https://www.npmjs.com/package/@types/node)
- [![eslint](https://img.shields.io/badge/eslint-8.56.0-brightgreen.svg)](https://www.npmjs.com/package/eslint)
- [![prettier](https://img.shields.io/badge/prettier-3.2.4-brightgreen.svg)](https://www.npmjs.com/package/prettier)
- [![prisma](https://img.shields.io/badge/prisma-5.8.1-brightgreen.svg)](https://www.npmjs.com/package/prisma)
- [![rimraf](https://img.shields.io/badge/rimraf-5.0.5-brightgreen.svg)](https://www.npmjs.com/package/rimraf)
- [![ts-node-dev](https://img.shields.io/badge/ts--node--dev-2.0.0-brightgreen.svg)](https://www.npmjs.com/package/ts-node-dev)
- [![typescript](https://img.shields.io/badge/typescript-5.3.3-brightgreen.svg)](https://www.npmjs.com/package/typescript)

Init project

```bash
  npm init -y
```

Install dependencies

```bash
  npm i -D typescript @types/node ts-node-dev eslint prettier eslint-config-airbnb
  eslint-config-prettier eslint-plugin-prettier rimraf
```

Execute this command for init typescript

```bash
  npx tsc --init --outDir dist/ --rootDir src
```

Create file `.eslintrc.js` in root folder

```js
module.exports = {
  settings: {
    react: {
      version: '999.999.999',
    },
  },
  extends: ['airbnb', 'prettier'],
  'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
};
```

For more information go to the [Documentation](https://eslint.org/docs/latest/use/configure/configuration-files)

Create file `.prettierrc.js` in root folder

```js
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
```

For more information go to the [Documentation](https://prettier.io/docs/en/options)

Add in VSCODE `settings.json` and install prettier and eslint plugins in to editor

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.validate": ["javascript", "typescript"]
}
```

For more information go to the [Documentation](https://code.visualstudio.com/docs/getstarted/settings)

Add command to `package.json` in section scripts

```json
{
  "lint": "eslint --fix ./src/*",
  "dev": "npx ts-node-dev --respawn --transpile-only --debug ./src/app.ts",
  "start": "npm run build && node dist/app.js",
  "build": "rimraf ./dist && tsc"
}
```

For more information go to the [Documentation](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)

## DOCKER

Create image for execute api with the file `Dockerfile`

```bash
  docker build -t example-image .
```

Execute image Two possibilities

1. Directly run the container

```bash
  docker run example-image
```

2. Run with docker compose `docker-compose.yml`

```bash
  docker compose up --build
```

For more information go to the [Documentation](https://docs.docker.com/get-started/overview/)

## SERVER

For route management we use `Fastify`

1. Install fastify fastify-cors

```bash
  npm install fastify @fastify/cors
```

For more information go to the [Documentation](https://fastify.dev/docs/latest/)

## VALIDATIONS

For validations we use `zod`

1. Install zod

```bash
  npm install zod
```

For more information go to the [Documentation](https://zod.dev/)

## DATABASE

For database management we use `Prisma`

1. Install prisma

```bash
  npm install prisma --save-dev
```

2. Setup Prisma

```sh
  npx prisma init --datasource-provider mysql
```

2. Run the migrations

```bash
  npx prisma migrate dev --name init
```

3. To generate the schema automatically if you already have a database, execute:

```bash
  npx prisma db pull
```

4. Generate primas client

```bash
  npx prisma generate
```

For more information go to the [Documentation](https://www.prisma.io/docs/orm)

## DEBUG IN VSCODE

Modify the `launch.json` and `task.json` file to your liking to run the vscode debug

```
  .vscode/launch.json
  .vscode/task.json
```

Plugins Recommended, read in:

```
  .vscode/extensions.json
```

For more information go to the [Documentation](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)
