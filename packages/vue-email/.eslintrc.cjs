/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    '@indielayer/eslint-config-vue',
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.spec.{js,ts,jsx,tsx}',
        'cypress/integration/**.spec.{js,ts,jsx,tsx}',
      ],
      extends: [
        'plugin:cypress/recommended',
      ],
    },
  ],
  rules: {
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
    ],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      'registeredComponentsOnly': false,
      'ignores': [],
    }],
  },
}
