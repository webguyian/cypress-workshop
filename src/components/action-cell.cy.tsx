import { ActionCell } from '@/components';
import type { Presenter } from '@/types';
import type { Row, Table } from '@tanstack/react-table';

const EDIT_MENU_TEXT = 'Edit';
const APPROVE_MENU_TEXT = 'Approve';
const REJECT_MENU_TEXT = 'Reject';
const SAVE_CHANGES_BUTTON_TEXT = 'Save changes';

describe('ActionCell', () => {
  const mockPresenter: Presenter = {
    id: '1',
    name: 'John Doe',
    company: 'Test Co',
    email: 'john@test.com',
    topic: 'Testing',
    date: '2025-04-17',
    duration: 60,
    status: 'review'
  };

  beforeEach(() => {
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
    // cy.get('button[data-slot="dropdown-menu-trigger"]').should('be.visible');
    cy.get('@actionsButton').should('be.visible');
  });

  it('shows dropdown menu when clicked', () => {
    // Check menu items exist
    cy.findByText(EDIT_MENU_TEXT).should('be.visible');
    cy.findByText(APPROVE_MENU_TEXT).should('be.visible');
    cy.findByText(REJECT_MENU_TEXT).should('be.visible');
  });

  it('opens drawer when Edit is clicked', () => {
    // Open dropdown and click Edit
    cy.findByText(EDIT_MENU_TEXT).click();

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
    cy.findByText(EDIT_MENU_TEXT).click();

    // Fill form
    cy.findByLabelText('Topic').clear().type('Updated Topic');
    cy.findByText(SAVE_CHANGES_BUTTON_TEXT).click();

    // Verify update was called
    cy.get('@updateRow').should('have.been.called');
  });

  it('approves a presentation', () => {
    cy.findByText(APPROVE_MENU_TEXT).click();

    // Verify updateRow was called with approved status
    cy.get('@updateRow').should('have.been.calledWith', {
      id: mockPresenter.id,
      status: 'approved'
    });
  });

  it('rejects a presentation', () => {
    cy.findByText(REJECT_MENU_TEXT).click();

    // Verify updateRow was called with rejected status
    cy.get('@updateRow').should('have.been.calledWith', {
      id: mockPresenter.id,
      status: 'rejected'
    });
  });

  it('closes dropdown when clicking outside', () => {
    cy.findByRole('menu').should('be.visible');

    // TODO: Click outside
    cy.get('html').click(1000, 500);
    // cy.get('body').click('bottomRight');

    // Verify dropdown is closed
    cy.findByRole('menu').should('not.exist');
  });
});
