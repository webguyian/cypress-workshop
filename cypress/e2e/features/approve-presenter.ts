import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const MESSAGE_APPROVED = 'Presentation approved';
const MESSAGE = (status: string) =>
  `Presenter is currently in ${status} status`;
const STATUS_APPROVED = 'approved';

Given('the user is on the dashboard', () => {
  cy.visit('/');
});

Given('a presenter with {string} status exists', (status: string) => {
  cy.findByRole('table')
    .findAllByText(status)
    .filter(':visible')
    .first()
    .closest('tr')
    .should('be.visible')
    .as('currentRow', { type: 'static' });

  getApprovedCount()
    .should('be.a', 'number')
    .as('approvedCount', { type: 'static' });
});

When('the user approves the presenter', () => {
  // Open the action menu for the selected presenter
  cy.get('@currentRow')
    .findByRole('button', { name: /actions/i })
    .should('be.visible')
    .click();

  // Click the approve option in the action menu
  cy.findByRole('menuitem', { name: /approve/i })
    .should('be.visible')
    .click();
});

Then('the presenter status should be {string}', (status: string) => {
  // Verify the presenter's status is updated correctly
  cy.get('@currentRow').contains(status).should('be.visible');

  // Check if the appropriate message is displayed based on the status
  if (status === STATUS_APPROVED) {
    cy.findByText(MESSAGE_APPROVED).should('be.visible');
  } else {
    cy.findByText(MESSAGE(status)).should('be.visible');
  }

  // Verify the approved count is updated correctly
  assertApprovedCountChange(status);
});

function getApprovedCount() {
  return cy
    .findByRole('region', { name: /approved presenters/i })
    .should('be.visible')
    .findByText(/\d+/)
    .invoke('text')
    .then((text) => parseInt(text, 10));
}

function assertApprovedCountChange(status: string) {
  getApprovedCount().then((newCount) => {
    cy.get('@approvedCount').then((count) => {
      if (status === STATUS_APPROVED) {
        cy.wrap(newCount).should('be.greaterThan', count);
      } else {
        cy.wrap(newCount).should('equal', count);
      }
    });
  });
}
