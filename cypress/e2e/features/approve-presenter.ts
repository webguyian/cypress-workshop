import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const STATUS_APPROVED = 'approved';
const MESSAGE_APPROVED = 'Presentation approved';
const MESSAGE = (status: string) =>
  `Presenter is currently in ${status} status`;

Given('the user is on the dashboard', () => {
  cy.visit('http://localhost:3000');
});

Given('a presenter with status {string} exists', (status: string) => {
  cy.findByRole('table')
    .findAllByText(status)
    .filter(':visible')
    .first()
    .closest('tr')
    .as('currentRow', { type: 'static' });

  cy.getApprovedCount()
    .should('be.a', 'number')
    .as('approvedCount', { type: 'static' });

  cy.get('@currentRow').should('be.visible');
});

When('the user approves the presenter', () => {
  // Open the action menu for the selected presenter
  cy.get('@currentRow').findByRole('button').should('be.visible').click();

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

  // Assert that the approved count is updated correctly
  assertApprovedCountChange(status, '@approvedCount');
});

function assertApprovedCountChange(status: string, approvedCountAlias: string) {
  cy.getApprovedCount().then((newCount) => {
    cy.get<number>(approvedCountAlias).then((count) => {
      if (status === STATUS_APPROVED) {
        expect(newCount).to.be.greaterThan(count);
      } else {
        expect(newCount).to.equal(count);
      }
    });
  });
}
