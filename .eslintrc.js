module.exports = {
  extends: 'airbnb-base',
  rules: {
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'no-param-reassign': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
    },
  ],
};
