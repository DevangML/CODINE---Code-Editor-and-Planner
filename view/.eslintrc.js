module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'preact'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': off,
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
