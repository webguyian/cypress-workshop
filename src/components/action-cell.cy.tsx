import { ActionCell } from '@/components';
import type { Presenter } from '@/types';
import type { Row, Table } from '@tanstack/react-table';

describe('ActionCell', () => {
  const mockPresenter: Presenter = {
    id: '1',
    name: 'John Doe',
    company: 'Test Co',
    email: 'john@test.com',
    topic: 'Testing',
    date: '2025-04-17',
    duration: 60,
    status: 'pending'
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
  });

  it('renders the action menu button', () => {
    cy.get('button[data-slot="dropdown-menu-trigger"]').should('exist');
  });

  it('shows dropdown menu when clicked', () => {
    cy.get('button[data-slot="dropdown-menu-trigger"]').click();

    // Check menu items exist
    cy.findByText('Edit').should('be.visible');
    cy.findByText('Approve').should('be.visible');
    cy.findByText('Reject').should('be.visible');
  });

  it('opens drawer when Edit is clicked', () => {
    // Open dropdown and click Edit
    cy.get('button[data-slot="dropdown-menu-trigger"]').click();
    cy.findByText('Edit').click();

    // Check if drawer is opened with form
    cy.findByText('Edit presentation details').should('be.visible');
    cy.get('form').should('exist');
    cy.findByLabelText('Topic').should('have.value', mockPresenter.topic);
  });

  it('handles form submission in drawer', () => {
    // Open dropdown and edit form
    cy.get('button[data-slot="dropdown-menu-trigger"]').click();
    cy.findByText('Edit').click();

    // Fill form
    cy.findByLabelText('Topic').clear().type('Updated Topic');
    cy.findByText('Save changes').click();

    // Verify update was called
    cy.get('@updateRow').should('have.been.called');
  });

  it('approves a presentation', () => {
    cy.get('button[data-slot="dropdown-menu-trigger"]').click();
    cy.findByText('Approve').click();

    // Verify updateRow was called with approved status
    cy.get('@updateRow').should('have.been.calledWith', {
      id: mockPresenter.id,
      status: 'approved'
    });
  });

  it('rejects a presentation', () => {
    cy.get('button[data-slot="dropdown-menu-trigger"]').click();
    cy.findByText('Reject').click();

    // Verify updateRow was called with rejected status
    cy.get('@updateRow').should('have.been.calledWith', {
      id: mockPresenter.id,
      status: 'rejected'
    });
  });

  it('closes dropdown when clicking outside', () => {
    // Open dropdown
    cy.get('button[data-slot="dropdown-menu-trigger"]').click();
    cy.findByRole('menu').should('be.visible');

    // TODO: Click outside
    cy.get('html').click(1000, 500);
    // cy.get('body').click('bottomRight');

    // Verify dropdown is closed
    cy.findByRole('menu').should('not.exist');
  });
});
