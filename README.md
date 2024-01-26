# SKELETON HEXAGONAL API TS

Init Project

```
npm init -y
```

Install Dependencies

```
npm i -D typescript @types/node ts-node-dev eslint prettier eslint-config-airbnb
eslint-config-prettier eslint-plugin-prettier rimraf
```

Execute this command for init typescript

```
npx tsc --init --outDir dist/ --rootDir src
```

Create File `.eslintrc.js` in root folder

```
module.exports = {
  settings: {
    react: {
      version: "999.999.999",
    },
  },
  extends: ["airbnb", "prettier"],
  "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
};
```

Create File `.prettierrc.js` in root folder

```
module.exports = {
  semi: true,
  trailingComma: "all",
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
};
```

Add in VSCODE `settings.json` and install prettier and eslint plugins in to editor

```
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"eslint.validate": ["javascript", "typescript"]
```

Add command to `package.json` in section scripts

```
"lint": "eslint --fix ./src/*",
"dev": "npx ts-node-dev --respawn --transpile-only --debug ./src/app.ts",
"start": "npm run build && node dist/app.js",
"build": "rimraf ./dist && tsc"
```

## DOCKER

Create image for execute api with the file `Dockerfile`

```
Docker build -t example-image .
```

Execute image Two possibilities

1. Directly run the container

```
  docker run example-image
```

2. Run with Docker Compose `docker-compose.yml`

```
docker compose up --build
```

// Todo: prisma, zod, fastify, fastify cors, debug vscode
