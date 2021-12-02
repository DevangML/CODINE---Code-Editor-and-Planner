module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'preact', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'import/no-unresolved': 0,
    'func-names': 0,
    'default-param-last': 0,
    'import/no-extraneous-dependencies': 0,
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': 0,
    'prettier/prettier': ['error'],
    'no-console': 0,
  },
  root: true,
  settings: {
    'import/resolver': {
      node: {
        paths: ['node_modules', 'src'],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
