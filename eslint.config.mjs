import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.plugins('unused-imports'),
  ...compat.config({
    ignorePatterns: [
      '.next/**',
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      '**/*.d.ts',
      '.github/**',
      '.vscode/**',
    ],
    rules: {
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Módulos integrados de Node.js
            'external', // Dependencias npm
            'internal', // Imports internos
            'parent', // Imports que van hacia arriba (..)
            'sibling', // Imports del mismo nivel (.)
            'index', // Imports del archivo index
            'object', // Imports de objetos
            'type', // Imports de tipos
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
    },
  }),
];

export default eslintConfig;
