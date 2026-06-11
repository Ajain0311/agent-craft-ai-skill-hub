module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier' // Must be last to override other configs
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  plugins: ['react-refresh', 'jsx-a11y', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_' // Ignore unused variables starting with _
      },
    ],
    '@typescript-eslint/no-explicit-any': 'error', // Strict mode: no 'any'
    '@typescript-eslint/no-non-null-assertion': 'warn', // Prefer optional chaining or type guards
    'jsx-a11y/anchor-is-valid': 'off', // Often too strict for SPA routing with client-side navigation
    'jsx-a11y/no-redundant-roles': 'error',
    'jsx-a11y/alt-text': 'warn',
    'jsx-a11y/label-has-associated-control': ['warn', { assert: 'either' }],
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
  },
};
