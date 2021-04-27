module.exports = {
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        pageTitle: 'The Internet App Test Report',
        publicPath: './reports',
        filename: 'report.html',
      },
    ],
  ],
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  globals: {
    testTimeout: 50000,
  },
  verbose: true,
};
