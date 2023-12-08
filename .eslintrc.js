module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['extends:universe/native'],
  rules: {
    'import/order': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
