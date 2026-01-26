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

// Regex patterns for input labels
const FILTER_LABELS = {
  NAME: /^name$/i,
  TOPIC: /^topic$/i,
  STATUS: /^status$/i,
  DATE_RANGE: /date range picker/i,
  MIN_DURATION: 'Min duration',
  MAX_DURATION: 'Max duration'
};

Given('the user is on the dashboard', () => {
  cy.visit('/');
});

Given('the filters panel is visible', () => {
  // Ensure the filters panel is open
  cy.findByRole('button', { name: /toggle filters/i })
    .should('be.visible')
    .click()
    .should('have.attr', 'aria-expanded', 'true');

  // Confirm filters are visible
  cy.findByLabelText(FILTER_LABELS.NAME).should('be.visible');
});

let originalRowCount: number;

Given('there are multiple presenters in the table', () => {
  // Store initial row count for later comparison
  cy.findByRole('table')
    .should('be.visible')
    .findAllByRole('row')
    .not('thead tr')
    .as('presenterRows')
    .then(($rows) => {
      originalRowCount = $rows.length;
      cy.wrap(originalRowCount).should('be.gte', 2);
    });
});

When('the user filters by name with {string}', (name: string) => {
  cy.findByLabelText(FILTER_LABELS.NAME)
    .should('be.visible')
    .clear()
    .type(name);
});

When('the user filters by status {string}', (status: string) => {
  cy.findByLabelText(FILTER_LABELS.STATUS).should('be.visible').click();
  cy.findByRole('option', { name: new RegExp(status, 'i') }).click();
});

When('the user resets all filters', () => {
  cy.findByRole('button', { name: /reset all filters/i })
    .should('be.visible')
    .click();
});

Then(
  'the table should only display presenters matching {string} and {string}',
  (name: string, status: string) => {
    // All visible rows must match the applied filters
    cy.get('@presenterRows').its('length').should('be.lte', originalRowCount);

    cy.get('@presenterRows').each(($row) => {
      cy.wrap($row)
        .findAllByRole('cell')
        .eq(TABLE_COLUMNS.NAME)
        .should('contain.text', name);

      // Verify status is "approved"
      cy.wrap($row)
        .findAllByRole('cell')
        .eq(TABLE_COLUMNS.STATUS)
        .should('contain.text', status);
    });
  }
);

Then('the table should show at least one row', () => {
  cy.get('@presenterRows').should('have.length.at.least', 1);
});

Then('the table should display "No results"', () => {
  // Only the "No results." row should be present
  cy.get('@presenterRows')
    .should('have.length', 1)
    .should('contain.text', 'No results.');
});

Then('the table should display all presenters', () => {
  // After reset, all presenters should be visible
  cy.get('@presenterRows').its('length').should('eq', originalRowCount);
});

Then('all filter inputs should be cleared', () => {
  // Verify name input is empty
  cy.findByLabelText(FILTER_LABELS.NAME).should('have.value', '');

  // Verify topic input is empty
  cy.findByLabelText(FILTER_LABELS.TOPIC).should('have.value', '');

  // Verify status select is reset (shows "All Statuses" when value is 'all')
  cy.findByLabelText(FILTER_LABELS.STATUS)
    .should('be.visible')
    .should('contain.text', 'All Statuses');

  // Verify date range picker button shows placeholder
  cy.findByRole('button', { name: FILTER_LABELS.DATE_RANGE })
    .should('be.visible')
    .should('contain.text', 'Pick a date range');

  // Verify duration slider min and max thumbs are reset using accessible labels
  cy.findByRole('slider', { name: FILTER_LABELS.MIN_DURATION })
    .should('be.visible')
    .should('have.attr', 'aria-valuenow', 0);

  cy.findByRole('slider', { name: FILTER_LABELS.MAX_DURATION })
    .should('be.visible')
    .should('have.attr', 'aria-valuenow', 120);
});
