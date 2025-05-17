const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'tests/cypress/e2e/**/*.cy.ts',
    supportFile: 'tests/cypress/support/e2e.js',
    fixturesFolder: 'tests/cypress/fixtures'
  }
});
