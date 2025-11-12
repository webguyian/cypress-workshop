import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', '**/*.feature'],
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        plugins: [tailwindcss()],
        resolve: {
          alias: {
            '@': '/src'
          }
        }
      }
    },
    specPattern: 'src/components/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
    viewportWidth: 1280,
    viewportHeight: 720
  }
});
