const dotenv = require("dotenv");
const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");

dotenv.config();

module.exports = defineConfig({
  viewportHeight: 600,
  viewportWidth: 1000,
  video: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  env: {
    base_url: process.env.BASE_URL,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      let options = browserify.defaultOptions;
      options.browserifyOptions.transform[1][1].plugins.push([
        "module-resolver",
        {
          alias: {
            "@tests": "./tests",
            "@helper": "./tests/helper",
          },
        },
      ]);
      on("file:preprocessor", browserify(options));
    },
    specPattern: "tests/scenario/**/*.test.js",
  },
});
