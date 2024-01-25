module.exports = {
  settings: {
    react: {
      version: "999.999.999",
    },
  },
  extends: ["airbnb", "prettier"],
  "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
};
