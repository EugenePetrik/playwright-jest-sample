module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  globals: {
    browser: true,
    context: true,
    page: true,
  },
  parser: 'babel-eslint',
  plugins: ['babel', 'prettier', 'jest'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: false,
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
    'plugin:jest-playwright/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'flow',
      },
    ],
    'no-unused-vars': 'error',
    'no-console': 'off',
    'no-mixed-spaces-and-tabs': 'warn',
    'babel/new-cap': 0,
    'babel/camelcase': 1,
    'babel/no-invalid-this': 1,
    'babel/object-curly-spacing': 0,
    'babel/semi': 1,
    'babel/no-unused-expressions': 1,
    'babel/valid-typeof': 1,
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': 'off',
    semi: ['error', 'always'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'max-len': ['error', { code: 120 }],
    'object-curly-spacing': [
      'off',
      'always',
      {
        objectsInObjects: true,
        arraysInObjects: true,
      },
    ],
  },
  settings: {
    jest: {
      version: 26,
    },
  },
};
