module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:react/jsx-runtime', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
