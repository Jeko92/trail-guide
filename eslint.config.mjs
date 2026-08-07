import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import sql from "eslint-plugin-sql"

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '.cache/**'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  prettier,


  {
    files: ['src/**/*.ts'],
    plugins: {
      sql,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'no-console': 'off',
      'sql/format': [
        'error',
        {
          tabWidth: 2,
        },
      ],
      'sql/no-unsafe-query': 'warn'
    },
  },
];
