module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: "vue-eslint-parser",
  plugins: ["vue", "@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:vue/vue3-recommended", "prettier"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    sourceType: "module",
    allowImportExportEverywhere: true
  },
  ignorePatterns: ["**/*.spec.ts", "packages/**/dist", "package.json"],
  rules: {
    "arrow-parens": ["error", "as-needed"],
    "comma-dangle": "off",
    "space-before-function-paren": "off",
    "max-len": [1, { code: 140 }],
    "require-jsdoc": 0,
    "no-invalid-this": 0,
    "import/no-absolute-path": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "vue/no-deprecated-slot-attribute": "off",
    "vue/require-default-prop": "off",
    "vue/html-self-closing": "off",
    "vue/max-attributes-per-line": "off",
    "vue/multi-word-component-names": 0,
    "vue/no-multiple-template-root": "off",
    "vue/first-attribute-linebreak": "off",
    "vue/setup-compiler-macros": 0
  }
};
