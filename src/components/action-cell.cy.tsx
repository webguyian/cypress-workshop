import { ActionCell } from '@/components';
import type { Presenter } from '@/types';
import type { Row, Table } from '@tanstack/react-table';
import { mockPresenters } from '@/const/mocks/presenters';

describe('ActionCell', () => {
  const mockPresenter = mockPresenters[0];

  beforeEach(() => {
    cy.on('uncaught:exception', () => {
      // return false to prevent the error from failing tests
      return false;
    });

    // ANTI-PATTERN: No spy - just a no-op function
    // Testing holes: Can't verify updateRow was called, can't verify parameters
    const mockUpdateRow = () => {};
    const mockRow = {
      original: mockPresenter
    } as Row<Presenter>;
    const mockTable = {
      options: {
        meta: {
          updateRow: mockUpdateRow
        }
      }
    } as unknown as Table<Presenter>;

    cy.mount(<ActionCell row={mockRow} table={mockTable} />);

    cy.findByRole('button', { name: /actions/i })
      .should('be.visible')
      .as('actionsButton')
      .click();
  });

  // ANTI-PATTERN: Combining multiple behaviors in one test
  it('renders button, shows menu, opens drawer, and submits form', () => {
    // Testing multiple behaviors in one test
    cy.get('@actionsButton').should('be.visible');

    // ANTI-PATTERN: Using text-based selector instead of role-based
    cy.contains('Edit').should('be.visible');
    cy.contains('Approve').should('be.visible');
    cy.contains('Reject').should('be.visible');

    // ANTI-PATTERN: Text-based selector, fragile
    cy.contains('Edit').click();

    // ANTI-PATTERN: Direct attribute selector instead of role-based
    cy.get('[role="dialog"]').should('be.visible');

    // ANTI-PATTERN: Generic selector by name attribute, not semantic
    cy.get('input[name="topic"]').should('have.value', mockPresenter.topic);

    // ANTI-PATTERN: Text matching instead of role
    cy.get('button').contains('Save changes').click();

    // ANTI-PATTERN: No assertion - can't verify updateRow was called
    // Missing: verification that updateRow was called with correct parameters
  });

  it('opens drawer when Edit is clicked', () => {
    // ANTI-PATTERN: Arrange - Doing setup inline instead of beforeEach
    // (Component already mounted, but showing the pattern)

    // ANTI-PATTERN: Attribute selector instead of role-based
    cy.get('button[aria-label="Actions"]').click();

    // ANTI-PATTERN: Assert - Checking menu is visible (unnecessary for this test)
    cy.contains('Edit').should('be.visible');

    // ANTI-PATTERN: Act - Clicking Edit (mixing act and assert)
    cy.contains('Edit').click();

    // ANTI-PATTERN: Assert - Checking dialog (but also checking form in the middle)
    cy.get('[role="dialog"]').should('be.visible');

    // ANTI-PATTERN: Asserting mid-flow instead of at the end
    cy.get('input[name="topic"]').should('have.value', mockPresenter.topic);

    // ANTI-PATTERN: More assertions scattered throughout instead of at the end
    cy.get('form').should('be.visible');
  });

  it('handles form submission in drawer', () => {
    // ANTI-PATTERN: Text-based selector
    cy.contains('Edit').click();

    // ANTI-PATTERN: Generic selector by name attribute, not semantic
    cy.get('input[name="topic"]').clear().type('Updated Topic');

    // ANTI-PATTERN: Text matching instead of role
    cy.get('button').contains('Save changes').click();

    // ANTI-PATTERN: No assertion - can't verify update was called
    // Missing: verification that updateRow was called
  });

  it('approves a presentation', () => {
    // ANTI-PATTERN: Text-based selector instead of role-based
    cy.contains('Approve').click();

    // ANTI-PATTERN: No assertion - can't verify updateRow was called
    // Testing holes:
    // - Can't verify updateRow was actually called
    // - Can't verify it was called with correct id
    // - Can't verify it was called with correct status
    // - Only testing UI changed, not component intent
    // - If updateRow silently fails, test still passes
    // - If wrong parameters passed, test still passes
  });

  it('rejects a presentation', () => {
    // ANTI-PATTERN: Text-based selector instead of role-based
    cy.contains('Reject').click();

    // ANTI-PATTERN: No assertion - can't verify updateRow was called
    // Missing: verification that updateRow was called with rejected status
  });

  it('closes dropdown when clicking outside', () => {
    // ANTI-PATTERN: Direct attribute selector
    cy.get('[role="menu"]').should('be.visible');

    cy.get('html').click(1000, 500);

    // ANTI-PATTERN: Direct attribute selector
    cy.get('[role="menu"]').should('not.exist');
  });
});
