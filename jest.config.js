module.exports = {
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testTimeout: 60000,
  maxWorkers: 1,
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
  verbose: true,
};
