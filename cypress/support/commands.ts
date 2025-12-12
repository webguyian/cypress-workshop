/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="@cypress-audit/lighthouse" />
import '@testing-library/cypress/add-commands';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Example of a custom command:
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('findByButton', (name) => {
  return cy.findByRole('button', { name: new RegExp(name, 'i') });
});

Cypress.Commands.add('findByRegex', (text) => {
  return cy.contains(new RegExp(text, 'i'));
});

Cypress.Commands.add('validateField', (label: string, errorMessage: string) => {
  cy.findByLabelText(label).clear().blur();
  cy.findByText(errorMessage).should('be.visible');
});
