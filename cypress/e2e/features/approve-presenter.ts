import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

Given('the user is on the dashboard', () => {
  cy.visit('/');
});

Given('a presenter with review status exists', () => {
  cy.wait(500); // Wait for table to load

  cy.get('tbody tr').each(($row) => {
    if ($row.find('td:nth-child(5)').text().includes('review')) {
      cy.wrap($row).as('currentRow');
      return false;
    }
  });
});

Given('a presenter with pending status exists', () => {
  cy.wait(500); // Wait for table to load

  cy.get('tbody tr').each(($row) => {
    if ($row.find('td:nth-child(5)').text().includes('pending')) {
      cy.wrap($row).as('currentRow');
      return false;
    }
  });
});

Given('a presenter with rejected status exists', () => {
  cy.wait(500); // Wait for table to load

  cy.get('tbody tr').each(($row) => {
    if ($row.find('td:nth-child(5)').text().includes('rejected')) {
      cy.wrap($row).as('currentRow');
      return false;
    }
  });
});

When('the user clicks the approve button', () => {
  cy.get('@currentRow').find('button').click();

  cy.get('button[data-slot="dropdown-menu-trigger"]').should('be.visible');

  cy.get('[role="menuitem"]').contains('Approve').click();
});

Then('the status should change to approved', () => {
  cy.get('@currentRow').find('td:nth-child(5)').should('contain', 'approved');

  cy.get('ol li').should('contain', 'Presentation approved');

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
