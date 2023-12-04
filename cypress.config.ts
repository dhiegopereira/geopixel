import { defineConfig } from "cypress";

export default defineConfig({
  reporter: "cypress-multi-reporters",

  reporterOptions: {
    configFile: "reporter.json",
  },

  video: false,
  screenshotOnRunFailure: false,
  viewportWidth: 1366,
  viewportHeight: 768,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
