import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierConfig from 'eslint-config-prettier';
import query from '@tanstack/eslint-plugin-query';

export default tseslint.config(
    {
        ignores: ['**/dist/**', '**/node_modules/**', '**/build/**', '**/coverage/**']
    },
    {
        files: ['**/*.{ts,tsx,js,mjs,cjs}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module'
        }
    },
    {
        files: ['apps/backend/**/*.ts'],
        languageOptions: {
            globals: globals.node
        }
    },
    {
        files: ['apps/ui/**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@tanstack/query': query
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            ...query.configs.recommended.rules
        }
    },
    prettierConfig
);
