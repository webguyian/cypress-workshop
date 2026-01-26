import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

const MESSAGE_UPDATED = 'Presentation details updated successfully';

// Table column indices for readability
const TABLE_COLUMNS = {
  NAME: 0,
  TOPIC: 1,
  DATE: 2,
  DURATION: 3,
  STATUS: 4,
  ACTIONS: 5
} as const;

Given('the user is on the dashboard', () => {
  // Start listening for the request
  cy.intercept('GET', '**/presenters.json').as('getPresenters');
  cy.visit('/');
  // Wait explicitly for that request to complete
  cy.wait('@getPresenters');
});

Given('a presenter exists in the table', () => {
  cy.findByRole('table')
    .findAllByRole('row')
    .not('thead tr')
    .should('have.length.at.least', 2)
    .first()
    .as('currentRow', { type: 'static' })
    .should('be.visible')
    .within(() => {
      cy.findAllByRole('cell')
        .eq(TABLE_COLUMNS.TOPIC)
        .invoke('text')
        .as('originalTopic', { type: 'static' });
    });
});

When('the user edits the presenter', () => {
  // Open the action menu for the selected presenter
  cy.get('@currentRow')
    .findByRole('button', { name: /actions/i })
    .should('be.visible')
    .click();

  // Click the edit option in the action menu
  cy.findByRole('menuitem', { name: /edit/i }).should('be.visible').click();

  // Verify the drawer is opened with the edit form
  cy.findByRole('dialog').should('be.visible');
  cy.findByRole('heading', { name: /edit presentation details/i }).should(
    'be.visible'
  );
});

When('the user updates the topic to {string}', (topic: string) => {
  cy.findByRole('textbox', { name: /^topic$/i })
    .should('be.visible')
    .clear()
    .type(topic);

  // Store the updated topic value for later validation
  cy.wrap(topic).as('updatedTopic', { type: 'static' });
});

When('the user updates the duration to {string}', (duration: string) => {
  cy.findByRole('spinbutton', { name: /^duration/i })
    .should('be.visible')
    .clear()
    .type(duration);

  // Store the updated duration value for later validation
  cy.wrap(duration).as('updatedDuration', { type: 'static' });
});

When('the user saves the changes', () => {
  cy.findByRole('button', { name: /save changes/i })
    .should('be.visible')
    .should('be.enabled')
    .click();
});

Then('the presenter details should be updated', () => {
  // Verify the drawer is closed
  cy.findByRole('dialog').should('not.exist');

  // Verify the table row still exists (presenter wasn't removed)
  cy.get('@currentRow').should('be.visible');

  // Verify the updated values appear in the table
  cy.get('@currentRow').within(() => {
    // Verify updated topic if it was changed
    cy.get('@updatedTopic').then((topic) => {
      if (topic) {
        cy.findAllByRole('cell')
          .eq(TABLE_COLUMNS.TOPIC)
          .should('contain', topic);
      }
    });

    // Verify updated duration if it was changed
    cy.get('@updatedDuration').then((duration) => {
      if (duration) {
        cy.findAllByRole('cell')
          .eq(TABLE_COLUMNS.DURATION)
          .should('contain', duration);
      }
    });
  });
});

Then('a success message should be displayed', () => {
  cy.findByText(MESSAGE_UPDATED).should('be.visible');
});

When('the user removes the duration field value', () => {
  cy.findByRole('spinbutton', { name: /^duration/i })
    .should('be.visible')
    .clear()
    .blur();
});

Then('a validation error for duration should be displayed', () => {
  cy.findByRole('spinbutton', { name: /^duration/i }).should(
    'have.attr',
    'aria-invalid',
    'true'
  );

  // Verify error mentions Duration + required (flexible matching)
  cy.findByRole('alert')
    .should('be.visible')
    .and('contain.text', 'Duration')
    .and('contain.text', 'required');
});

Then('the save changes button should be disabled', () => {
  cy.findByRole('button', { name: /save changes/i })
    .should('be.visible')
    .should('be.disabled');
});

When('the user closes the modal without saving', () => {
  // Click the close button (X icon) in the sheet header
  cy.findByRole('button', { name: /close/i }).should('be.visible').click();
});

Then('the presenter details should remain unchanged', () => {
  // Verify the drawer is closed
  cy.findByRole('dialog').should('not.exist');

  // Verify the table row still exists
  cy.get('@currentRow').should('be.visible');

  // Verify the topic value is still the original value (not changed)
  cy.get('@currentRow').within(() => {
    cy.get('@originalTopic').then((originalTopic) => {
      cy.findAllByRole('cell')
        .eq(TABLE_COLUMNS.TOPIC)
        .should('contain', originalTopic);
    });
  });
});
