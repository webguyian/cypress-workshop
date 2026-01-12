import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Brute force step definitions for the 'Start' feature

Given('the user is on the dashboard', () => {
  cy.visit('http://localhost:3000');
});

Given('a presenter with review status exists', () => {
  // Wait for table to load (brittle delay)
  cy.wait(500);

  // Using brittle column indices and each loops
  cy.get('tbody tr').each(($row) => {
    if ($row.find('td:nth-child(5)').text().includes('review')) {
      cy.wrap($row).as('currentRow');
      return false;
    }
  });
});

Given('a presenter with pending status exists', () => {
  // Wait for table to load (brittle delay)
  cy.wait(500);

  cy.get('tbody tr').each(($row) => {
    if ($row.find('td:nth-child(5)').text().includes('pending')) {
      cy.wrap($row).as('currentRow');
      return false;
    }
  });
});

Given('a presenter with rejected status exists', () => {
  // Wait for table to load (brittle delay)
  cy.wait(500);

  cy.get('tbody tr').each(($row) => {
    if ($row.find('td:nth-child(5)').text().includes('rejected')) {
      cy.wrap($row).as('currentRow');
      return false;
    }
  });
});

When('the user clicks the approve button', () => {
  // Opening the menu and clicking approve
  cy.get('@currentRow').find('button').click();

  // Brittle check for the trigger slot
  cy.get('button[data-slot="dropdown-menu-trigger"]').should('be.visible');

  cy.get('[role="menuitem"]').contains('Approve').click();
});

Then('the status should change to approved', () => {
  // Brittle column check
  cy.get('@currentRow').find('td:nth-child(5)').should('contain', 'approved');

  // Brittle toast check
  cy.get('ol li').should('contain', 'Presentation approved');

  // Brittle count check
  cy.contains('section', 'Approved Presenters')
    .contains('ready to present')
    .prev()
    .should('contain', '19');
});

Then('the status should still be pending', () => {
  cy.get('@currentRow').find('td:nth-child(5)').should('contain', 'pending');
});

Then('the status should still be rejected', () => {
  cy.get('@currentRow').find('td:nth-child(5)').should('contain', 'rejected');
});
