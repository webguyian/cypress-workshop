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
  cy.visit('http://localhost:3000');
});

Given('a presenter exists in the table', () => {
  cy.wait(1000);
  cy.findByRole('table')
    .findAllByRole('row')
    .not('thead tr')
    .first()
    .as('currentRow', { type: 'static' });

  cy.get('@currentRow').should('be.visible');
});

When('the user edits the presenter', () => {
  // Store the original topic value from the table before making changes
  cy.get('@currentRow').within(() => {
    cy.findAllByRole('cell')
      .eq(TABLE_COLUMNS.TOPIC)
      .invoke('text')
      .as('originalTopic', { type: 'static' });
  });

  // Open the action menu for the selected presenter
  // Break up the chain to avoid timing issues with page updates
  cy.get('@currentRow').findByRole('button').should('be.visible').as('actionButton');
  cy.get('@actionButton').click();

  // Click the edit option in the action menu
  cy.findByRole('menuitem', { name: /edit/i })
    .should('be.visible')
    .click();

  // Verify the drawer is opened with the edit form
  cy.findByRole('dialog').should('be.visible');
  cy.findByRole('heading', { name: /edit presentation details/i }).should('be.visible');
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
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.TOPIC).should('contain', topic);
      }
    });
    
    // Verify updated duration if it was changed
    cy.get('@updatedDuration').then((duration) => {
      if (duration) {
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.DURATION).should('contain', duration);
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
    .blur(); // Trigger validation on blur
});

Then('a validation error for duration should be displayed', () => {
  cy.findByText('Duration is required').should('be.visible');
});

Then('the save changes button should be disabled', () => {
  cy.findByRole('button', { name: /save changes/i })
    .should('be.visible')
    .should('be.disabled');
});

When('the user closes the modal without saving', () => {
  // Click the close button (X icon) in the sheet header
  cy.findByRole('button', { name: /close/i })
    .should('be.visible')
    .click();
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

