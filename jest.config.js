module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/jest/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};
