module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  root: true,
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
}
