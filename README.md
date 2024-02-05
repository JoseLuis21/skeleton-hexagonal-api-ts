# SKELETON API TS HEXAGONAL

[![npm version](https://img.shields.io/badge/npm-10.3.0-orange.svg)](https://www.npmjs.com/package/npm)

### Dependencies

- [![fastify](https://img.shields.io/badge/fastify-4.25.2-brightgreen.svg)](https://www.npmjs.com/package/fastify)
- [![@fastify/cors](https://img.shields.io/badge/@fastify/cors-8.5.0-brightgreen.svg)](https://www.npmjs.com/package/@fastify/cors)
- [![@fastify/jwt](https://img.shields.io/badge/@fastify--jwt-8.0.0-brightgreen.svg)](https://www.npmjs.com/package/@fastify/jwt)
- [![@fastify/rate-limit](https://img.shields.io/badge/@fastify--rate--limit-9.1.0-brightgreen.svg)](https://www.npmjs.com/package/@fastify/rate-limit)
- [![@prisma/client](https://img.shields.io/badge/@prisma/client-5.8.1-brightgreen.svg)](https://www.npmjs.com/package/@prisma/client)
- [![zod](https://img.shields.io/badge/zod-3.22.4-brightgreen.svg)](https://www.npmjs.com/package/zod)
- [![dotenv](https://img.shields.io/badge/dotenv-16.4.1-brightgreen.svg)](https://www.npmjs.com/package/dotenv)
- [![env-var](https://img.shields.io/badge/env--var-7.4.1-brightgreen.svg)](https://www.npmjs.com/package/env-var)
- [![bcryptjs](https://img.shields.io/badge/bcryptjs-2.4.3-brightgreen.svg)](https://www.npmjs.com/package/bcryptjs)
- [![ioredis](https://img.shields.io/badge/ioredis-5.3.2-brightgreen.svg)](https://www.npmjs.com/package/ioredis)
- [![@fastify/swagger](https://img.shields.io/badge/@fastify/swagger-8.14.0-brightgreen.svg)](https://www.npmjs.com/package/@fastify/swagger)
- [![@scalar/fastify-api-reference](https://img.shields.io/badge/@scalar/fastify--api--reference-1.14.8-brightgreen.svg)](https://www.npmjs.com/package/@scalar/fastify-api-reference)

### Development dependencies

- [![@types/node](https://img.shields.io/badge/@types/node-20.11.5-blue.svg)](https://www.npmjs.com/package/@types/node)
- [![eslint](https://img.shields.io/badge/eslint-8.56.0-blue.svg)](https://www.npmjs.com/package/eslint)
- [![prettier](https://img.shields.io/badge/prettier-3.2.4-blue.svg)](https://www.npmjs.com/package/prettier)
- [![prisma](https://img.shields.io/badge/prisma-5.8.1-blue.svg)](https://www.npmjs.com/package/prisma)
- [![rimraf](https://img.shields.io/badge/rimraf-5.0.5-blue.svg)](https://www.npmjs.com/package/rimraf)
- [![ts-node-dev](https://img.shields.io/badge/ts--node--dev-2.0.0-blue.svg)](https://www.npmjs.com/package/ts-node-dev)
- [![typescript](https://img.shields.io/badge/typescript-5.3.3-blue.svg)](https://www.npmjs.com/package/typescript)

Init project

```bash
  npm init -y
```

Install dependencies

```bash
  npm i -D typescript @types/node ts-node-dev eslint rimraf prettier eslint-plugin-prettier eslint-config-prettier
```

Execute this command for init typescript

```bash
  npx tsc --init --outDir dist/ --rootDir src
```

Create file `.eslintrc.json` in root folder

1. Generate file config for eslint

```bash
  npx eslint --init
```

```json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": ["standard-with-typescript", "plugin:prettier/recommended"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {}
}
```

For more information go to the [Documentation](https://eslint.org/docs/latest/use/configure/configuration-files)

Create file `.prettierrc.json` in root folder

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "printWidth": 120,
  "semi": true,
  "singleQuote": true
}
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

## CACHE REDIS

1. Install redis

```bash
  npm install ioredis
```

2. Use `RedisClientAdapter` for cache

For more information go to the [Documentation](https://github.com/redis/ioredis#readme)

## RATE LIMIT

1. Install `@fastify/rate-limit` using cache Redis for multiples server

```bash
  npm i @fastify/rate-limit
```

For more information go to the [Documentation](https://github.com/fastify/fastify-rate-limit#readme)

## PRIVATE ROUTES

1. Install `fastify-jwt`

```bash
  npm install @fastify/jwt
```

2. A file is created to extend the FastifyInstance types which allows adding the plugin to the routes without typing errors

- File in `./src/internal/server/fastify.d.ts`

3. For use add in routes `onRequest: [fastify.authenticate]` for example:

```js
fastify.get(
  '/',
  {
    onRequest: [fastify.authenticate],
  },
  userController.getUsers.bind(userController),
);
```

- File of the plugin is `./src/modules/users/infrastructure/http/routes/user.routes.ts`

4. To generate the token, it is done with the `Reply` object with the `jwtSign` method for example:

```js
const token = await reply.jwtSign({ payload });
```

For more information go to the [Documentation](https://github.com/fastify/fastify-jwt#readme)

## DOCUMENTATION API

For generate doc use `@fastify/swagger` and for UI use `@scalar/fastify-api-reference`

1. Install dependencies

```bash
  npm install @fastify/swagger @scalar/fastify-api-reference
```

2. Configure Plugin in `server.ts`

3. Example Schemas in module `User`

For more information go to the [Documentation @fastify/swagger](https://github.com/fastify/fastify-swagger)
For more information go to the [Documentation @scalar/fastify-api-reference](https://github.com/scalar/scalar)

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

4. Generate primas client (execute every update shema)

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

## ENVIRONMENT VARIABLES

1. Rename the `env.example` to `.env`
2. configure your variables in `/src/internal/environment/variables.ts`

For more information go to the [Documentation](https://github.com/motdotla/dotenv#readme)
