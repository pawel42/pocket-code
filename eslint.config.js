const expoConfig = require('eslint-config-expo/flat');
const perfectionist = require('eslint-plugin-perfectionist');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { defineConfig } = require('eslint/config');

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'prettier/prettier': 'warn',
      'perfectionist/sort-exports': [
        'warn',
        {
          type: 'natural',
          partitionByNewLine: true,
          groups: ['value-export', 'type-export'],
        },
      ],
      'perfectionist/sort-imports': [
        'warn',
        {
          type: 'natural',
          groups: [
            'side-effect',
            'type-import',
            { newlinesBetween: 0 },
            ['value-builtin', 'value-external'],
            'type-internal',
            { newlinesBetween: 0 },
            'value-internal',
            ['type-parent', 'type-sibling', 'type-index'],
            { newlinesBetween: 0 },
            ['value-parent', 'value-sibling', 'value-index'],
            'ts-equals-import',
            'unknown',
          ],
        },
      ],
      'perfectionist/sort-named-exports': [
        'warn',
        { type: 'natural', groups: ['value-export', 'type-export'] },
      ],
      'perfectionist/sort-named-imports': [
        'warn',
        { type: 'natural', groups: ['value-import', 'type-import'] },
      ],
    },
  },
]);
