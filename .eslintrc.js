module.exports = {
  parser: './client/node_modules/babel-eslint',
  env: {
    browser: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier'],
  settings: {
    react: {
      // eslint-disable-next-line global-require
      version: require('./client/package.json').dependencies.react,
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'react/jsx-filename-extension': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
