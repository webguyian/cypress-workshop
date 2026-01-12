import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Brute force step definitions for the 'Start' feature

Given('the user is on the dashboard', () => {
  cy.visit('http://localhost:3000');
});

When('the user clicks the toggle filters button', () => {
  // Brittle attribute selector (contains doesn't find aria-label or title)
  cy.get('button[title="Toggle filters"]').click();
  cy.wait(500); // Brittle wait for animation
});

Then('the filter name input should be visible', () => {
  cy.get('input[placeholder="Filter name..."]').should('be.visible');
});

When('the user types {string} into the search name input', (name: string) => {
  cy.get('input[placeholder="Filter name..."]').type(name);
});

When('the user selects {string} from the status dropdown', (status: string) => {
  // Using very generic selectors instead of roles
  cy.get('button').contains('All Statuses').parent().click();
  cy.get('div[role="option"]').contains(new RegExp(status, 'i')).click();
});

Then('the table should show {int} row', (count: number) => {
  cy.get('tbody tr').should('have.length', count);
});

Then(
  'the first row should contain {string} and {string}',
  (name: string, status: string) => {
    // Brittle column index targeting
    cy.get('tbody tr').first().find('td').eq(0).should('contain', name);
    cy.get('tbody tr').first().find('td').eq(4).should('contain', status);
  }
);

When('the user clicks the reset all filters button', () => {
  cy.get('button').contains('Reset All Filters').click();
});

Then('the search name input should be empty', () => {
  cy.get('input[placeholder="Filter name..."]').should('have.value', '');
});

Then('there should be more than {int} row in the table', (count: number) => {
  cy.get('tbody tr').its('length').should('be.gt', count);
});
