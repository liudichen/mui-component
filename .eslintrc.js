module.exports = {
  extends: 'eslint-config-egg',
  env: {
    browser: true,
  },
  plugins: [
    'react',
  ],
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      extends: 'eslint-config-egg/typescript',
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 'error',
        'generator-star-spacing': 'off',
        'babel/generator-star-spacing': 'off',
        'arrow-parens': [ 'warn', 'always' ],
        'no-empty': [ 'error', { allowEmptyCatch: true }],
        'prefer-promise-reject-errors': 'off',
      },
    },
  ],
  rules: {
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 'error',
    'generator-star-spacing': 'off',
    'babel/generator-star-spacing': 'off',
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '(^_)|(^props$)|(^e$)',
      },
    ],
    'arrow-parens': [ 'warn', 'always' ],
    'no-empty': [ 'error', { allowEmptyCatch: true }],
    'prefer-promise-reject-errors': 'off',
  },
};
