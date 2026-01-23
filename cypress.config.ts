import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import coverageTask from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
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

      // Register the code coverage task
      coverageTask(on, config);

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: ['cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', '**/*.feature'],
    video: false,
    viewportWidth: 1280,
    viewportHeight: 720
  },
  env: {
    codeCoverage: {
      url: 'http://localhost:3000/__coverage__',
      expectFrontendCoverageOnly: true
    }
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: async () => {
        const tailwindcss = (await import('@tailwindcss/vite')).default;
        const react = (await import('@vitejs/plugin-react')).default;
        return {
          plugins: [react(), tailwindcss()],
          resolve: {
            alias: {
              '@': '/src'
            }
          }
        };
      }
    },
    setupNodeEvents(on, config) {
      // Register the code coverage task
      coverageTask(on, config);
      return config;
    },
    specPattern: 'src/components/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component.ts',
    viewportWidth: 1280,
    viewportHeight: 720
  }
});
