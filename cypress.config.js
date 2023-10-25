const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportTitle: "My test report",
    reportDir: "cypress/results",
    overwrite: false,
    html: true,
    json: false
  },
  setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(
        on
    );
},
  e2e: {
    specPattern: 'cypress/integration/**/*.js'
  },
  downloadsFolder: 'cypress/downloads',
  experimentalMemoryManagement:true,
  numTestsKeptInMemory: 0,
  defaultCommandTimeout: 100000
});
