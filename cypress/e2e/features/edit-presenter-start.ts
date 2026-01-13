import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Brute force step definitions for the 'Start' feature

Given('the user is on the dashboard', () => {
  cy.visit('http://localhost:3000');
});

Given('the table has loaded data', () => {
  cy.wait(500); // Wait for data to load
  cy.get('tbody tr').should('have.length.at.least', 1);
});

When('the user clicks the actions button on the first row', () => {
  cy.get('tbody tr').first().find('button').click();
});

When('the user clicks the edit menu item', () => {
  cy.get('[role="menuitem"]').contains('Edit').click();
  cy.wait(500); // Wait for drawer animation
});

When('the user types {string} into the topic input', (text: string) => {
  cy.get('#topic').clear().type(text);
});

When('the user types {string} into the presenter input', (text: string) => {
  cy.get('#name').clear().type(text);
});

When('the user clicks the save button', () => {
  cy.get('button[type="submit"]').click();
});

Then(
  'the first row should have {string} in the second column',
  (text: string) => {
    cy.get('tbody tr').first().find('td:nth-child(2)').should('contain', text);
  }
);

Then(
  'the first row should have {string} in the first column',
  (text: string) => {
    cy.get('tbody tr').first().find('td:nth-child(1)').should('contain', text);
  }
);

When('the user clears the duration input', () => {
  cy.get('#duration').clear().blur();
});

Then('the error {string} should be visible', (error: string) => {
  cy.contains(error).should('be.visible');
});

Then('the save button should be disabled', () => {
  cy.get('button[type="submit"]').should('be.disabled');
});
