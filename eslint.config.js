import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        requestAnimationFrame: 'readonly',
        performance: 'readonly',
        console: 'readonly',
        Math: 'readonly',
        JSON: 'readonly',
        Date: 'readonly',
        parseInt: 'readonly',
        parseFloat: 'readonly',
      },
    },
  },
  {
    ignores: ['node_modules/'],
  },
];
