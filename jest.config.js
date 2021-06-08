module.exports = {
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  testMatch: ['**/tests/**/*.test.js'],
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
