import { ActionCell } from '@/components';
import type { Presenter } from '@/types';
import type { Row, Table } from '@tanstack/react-table';
import { mockPresenters } from '@/const/mocks/presenters';

const EDIT_MENU_TEXT = 'Edit';
const APPROVE_MENU_TEXT = 'Approve';
const REJECT_MENU_TEXT = 'Reject';
const SAVE_CHANGES_BUTTON_TEXT = 'Save changes';

describe('ActionCell', () => {
  const mockPresenter = mockPresenters[0];

  beforeEach(() => {
    cy.on('uncaught:exception', () => {
      // return false to prevent the error from failing tests
      return false;
    });

    const mockUpdateRow = cy.spy().as('updateRow');
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

  it('renders the action menu button', () => {
    cy.get('@actionsButton').should('be.visible');
  });

  it('shows dropdown menu when clicked', () => {
    // Check menu items exist
    cy.findByRole('menuitem', { name: EDIT_MENU_TEXT }).should('be.visible');
    cy.findByRole('menuitem', { name: APPROVE_MENU_TEXT }).should('be.visible');
    cy.findByRole('menuitem', { name: REJECT_MENU_TEXT }).should('be.visible');
  });

  it('opens drawer when Edit is clicked', () => {
    // Open dropdown and click Edit
    cy.findByRole('menuitem', { name: EDIT_MENU_TEXT }).click();

    // Check if drawer is opened with form
    cy.findByRole('dialog').should('be.visible');
    cy.findByRole('heading', { name: /edit presentation details/i }).should(
      'be.visible'
    );
    cy.findByRole('form').should('be.visible');
    cy.findByLabelText('Topic').should('have.value', mockPresenter.topic);
  });

  it('handles form submission in drawer', () => {
    // Open dropdown and edit form
    cy.findByRole('menuitem', { name: EDIT_MENU_TEXT }).click();

    // Fill form
    cy.findByLabelText('Topic').clear().type('Updated Topic');
    cy.findByRole('button', { name: SAVE_CHANGES_BUTTON_TEXT }).click();

    // Verify update was called
    cy.get('@updateRow').should('have.been.called');
  });

  it('approves a presentation', () => {
    cy.findByRole('menuitem', { name: APPROVE_MENU_TEXT }).click();

    // Verify updateRow was called with approved status
    cy.get('@updateRow').should('have.been.calledWith', {
      id: mockPresenter.id,
      status: 'approved'
    });
  });

  it('rejects a presentation', () => {
    cy.findByRole('menuitem', { name: REJECT_MENU_TEXT }).click();

    // Verify updateRow was called with rejected status
    cy.get('@updateRow').should('have.been.calledWith', {
      id: mockPresenter.id,
      status: 'rejected'
    });
  });

  it('closes dropdown when clicking outside', () => {
    cy.findByRole('menu').should('be.visible');

    // Click outside
    cy.get('body').click('bottomRight');

    // Verify dropdown is closed
    cy.findByRole('menu').should('not.exist');
  });
});
