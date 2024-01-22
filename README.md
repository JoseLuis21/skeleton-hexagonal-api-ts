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
  extends: [
    "airbnb",
    "prettier",
  ],
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
