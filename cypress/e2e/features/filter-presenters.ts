import { Given, Then, When } from '@badeball/cypress-cucumber-preprocessor';

// Table column indices for readability
const TABLE_COLUMNS = {
  NAME: 0,
  TOPIC: 1,
  DATE: 2,
  DURATION: 3,
  STATUS: 4,
  ACTIONS: 5
} as const;

// Helper function to refresh the presenterRows alias with current filtered table state
function fetchUpdatedPresenterRows() {
  cy.findByRole('table')
    .should('be.visible')
    .findAllByRole('row')
    .not('thead tr')
    .as('presenterRows');
}

Given('the user is on the dashboard', () => {
  cy.visit('http://localhost:3000');
});

Given('the filters panel is visible', () => {
  // Try to find the name input - if it doesn't exist or isn't visible, click toggle
  cy.get('body').then(($body) => {
    const nameInputExists = $body.find('input[id*="name-filter-input"]:visible').length > 0;
    if (!nameInputExists) {
      // Filters are not visible, click to show them
      cy.findByRole('button', { name: /toggle filters/i })
        .should('be.visible')
        .click()
        .should('have.attr', 'aria-expanded', 'true');
    }
  });

  cy.findByLabelText(/^name$/i).should('be.visible');
});

Given('there are multiple presenters in the table', () => {
  // Wait for table to load and create static alias for original unfiltered rows
  cy.findByRole('table')
    .should('be.visible')
    .findAllByRole('row')
    .not('thead tr')
    .as('originalPresenterRows', { type: 'static' });
  cy.get('@originalPresenterRows').should('have.length.at.least', 2);
});

Given('the user has applied multiple filters', () => {
  // Apply name filter
  cy.findByRole('textbox', { name: /^name$/i })
    .should('be.visible')
    .type('Roderic');

  // Apply status filter
  cy.findByRole('combobox', { name: /^status$/i })
    .should('be.visible')
    .click();
  cy.findByRole('option', { name: /pending/i }).click();
});

When('the user filters by name with {string}', (name: string) => {
  cy.findByRole('textbox', { name: /^name$/i })
    .should('be.visible')
    .clear()
    .type(name);
});

When('the user filters by status {string}', (status: string) => {
  cy.findByRole('combobox', { name: /^status$/i })
    .should('be.visible')
    .click();
  cy.findByRole('option', { name: new RegExp(status, 'i') }).click();
});

When('the user resets all filters', () => {
  cy.findByRole('button', { name: /reset all filters/i })
    .should('be.visible')
    .click();
});

Then('the table should only display presenters matching all filter criteria', () => {
  fetchUpdatedPresenterRows();
  
  // Verify filters actually changed the table (filtered rows differ from original)
  cy.get('@presenterRows').then(($filteredRows) => {
    cy.get('@originalPresenterRows').then(($originalRows) => {
      expect($filteredRows.length).to.not.equal($originalRows.length);
    });
  });
  
  cy.get('@presenterRows').each(($row) => {
    // Verify name contains "Roderic"
    cy.wrap($row)
      .findAllByRole('cell')
      .eq(TABLE_COLUMNS.NAME)
      .should('contain.text', 'Roderic');

    // Verify status is "approved"
    cy.wrap($row)
      .findAllByRole('cell')
      .eq(TABLE_COLUMNS.STATUS)
      .should('contain.text', 'approved');
  });
});

Then('the table should show at least one row', () => {
  fetchUpdatedPresenterRows();
  cy.get('@presenterRows').should('have.length.at.least', 1);
});

Then('the table should display "No results"', () => {
  // Verify there is exactly one row (the "No results." row) and it contains the text
  fetchUpdatedPresenterRows();
  cy.get('@presenterRows')
    .should('have.length', 1)
    .should('contain.text', 'No results.');
});

Then('the table should display all presenters', () => {
  // After reset, we should see all presenters again
  fetchUpdatedPresenterRows();
  
  // Verify reset restored all original rows
  cy.get('@presenterRows').then(($resetRows) => {
    cy.get('@originalPresenterRows').then(($originalRows) => {
      expect($resetRows.length).to.equal($originalRows.length);
    });
  });
  
  cy.get('@presenterRows').should('have.length.at.least', 1);
});

Then('all filter inputs should be cleared', () => {
  // Verify name input is empty
  cy.findByRole('textbox', { name: /^name$/i }).should('have.value', '');

  // Verify topic input is empty
  cy.findByRole('textbox', { name: /^topic$/i }).should('have.value', '');

  // Verify status select is reset (shows "All Statuses" when value is 'all')
  cy.findByRole('combobox', { name: /^status$/i })
    .should('be.visible')
    .should('contain.text', 'All Statuses');

  // Verify date range picker button is reset and shows placeholder
  cy.findByRole('button', { name: /date range picker/i })
    .should('be.visible')
    .should('contain.text', 'Pick a date range');
});
