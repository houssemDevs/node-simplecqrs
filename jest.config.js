module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: [6059, 18002, 18003, 2532],
      },
    },
  },
};
