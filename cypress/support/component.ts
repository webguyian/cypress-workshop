import '@testing-library/cypress/add-commands';
import { mount } from 'cypress/react';

// Import global styles
import '@/index.css';

// Import commands.js using ES2015 syntax:
import './commands';
declare global {
  namespace Cypress {
    interface Chainable {
      getApprovedCount: () => Chainable<number>;
      mount: typeof mount;
      findByButton(name: string | RegExp): Chainable<JQuery<HTMLElement>>;
      findByRegex(text: string | RegExp): Chainable<JQuery<HTMLElement>>;
      validateField(
        label: string,
        errorMessage: string
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('mount', mount);

// Suppress ResizeObserver loop error
Cypress.on(
  'uncaught:exception',
  (err) => !err.message.includes('ResizeObserver loop completed')
);
