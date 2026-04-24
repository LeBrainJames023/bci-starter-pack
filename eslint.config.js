import js from '@eslint/js';

const browserGlobals = {
  window: 'readonly',
  document: 'readonly',
  localStorage: 'readonly',
  requestAnimationFrame: 'readonly',
  performance: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  getComputedStyle: 'readonly',
};

export default [
  js.configs.recommended,
  {
    // Shared BCI modules are classic scripts loaded via <script> tags.
    // They attach everything to the global BCI object.
    files: ['shared/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...browserGlobals,
        BCI: 'writable',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
  {
    ignores: ['node_modules/'],
  },
];
