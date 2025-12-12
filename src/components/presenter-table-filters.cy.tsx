import { PresenterTableFilters } from '@/components/presenter-table-filters';
import { useTestTableInstance } from '../../cypress/support/table-test-utils';
import { Table } from '@tanstack/react-table';
import { Presenter } from '@/types';

describe('PresenterTableFilters', () => {
  const PresenterTableFiltersTest = () => {
    const table = useTestTableInstance() as Table<Presenter>;
    const column = {
      setFilterValue: cy.stub().as('setFilterValue'),
      getFilterValue: cy.stub().returns('')
    };
    cy.stub(table, 'getColumn').returns(
      column as unknown as ReturnType<typeof table.getColumn>
    );
    cy.stub(table, 'resetColumnFilters').as('resetColumnFilters');
    return <PresenterTableFilters table={table} showFilters={true} />;
  };

  beforeEach(() => {
    cy.mount(<PresenterTableFiltersTest />);
  });

  it('handles name input filtering', () => {
    cy.findByRole('textbox', { name: /^name$/i })
      .should('be.visible')
      .should('have.value', '')
      .type('J');
    cy.get('@setFilterValue').should('have.been.calledWith', 'J');
  });

  it('handles topic input filtering', () => {
    cy.findByRole('textbox', { name: /^topic$/i })
      .should('be.visible')
      .should('be.enabled')
      .type('R');
    cy.get('@setFilterValue').should('have.been.calledWith', 'R');
  });

  it('handles date range filtering', () => {
    cy.findByRole('button', { name: /date range picker/i }).click();
    cy.findByRole('dialog').should('be.visible');

    // Match the full aria-label format like "January 15, 2025" for more specificity
    cy.findAllByRole('button', { name: /\w+\s+15,\s+\d{4}/i })
      .first()
      .should('be.visible')
      .then(($firstButton) => {
        const firstAriaLabel = $firstButton.attr('aria-label') || '';
        const firstMatch = firstAriaLabel.match(/(\w+)\s+15,\s+(\d{4})/);
        if (firstMatch) {
          const [, month, year] = firstMatch;
          cy.wrap($firstButton).click();
          cy.findByRole('dialog').should('be.visible');
          cy.findAllByRole('button', {
            name: new RegExp(`${month}\\s+20,\\s+${year}`, 'i')
          })
            .first()
            .should('be.visible')
            .click();
        } else {
          cy.wrap($firstButton).click();
          cy.findByRole('dialog').should('be.visible');
          cy.findAllByRole('button', { name: /\w+\s+20,\s+\d{4}/i })
            .first()
            .should('be.visible')
            .click();
        }
      });

    cy.get('@setFilterValue').should('have.been.called');
    cy.get('@setFilterValue').then((stub) => {
      const calls = (stub as unknown as sinon.SinonStub).getCalls();
      const dateRangeCall = [...calls]
        .reverse()
        .find((call) => call.args[0] && call.args[0].from && call.args[0].to);
      if (dateRangeCall) {
        expect(dateRangeCall.args[0]).to.have.property('from');
        expect(dateRangeCall.args[0]).to.have.property('to');
        expect(dateRangeCall.args[0].from).to.be.instanceOf(Date);
        expect(dateRangeCall.args[0].to).to.be.instanceOf(Date);
      } else {
        throw new Error(
          'setFilterValue was not called with a complete date range'
        );
      }
    });
  });

  it('handles duration range filtering', () => {
    // Scope to the duration slider component to avoid matching any slider on the page
    cy.findByLabelText('Duration')
      .parent()
      .within(() => {
        cy.findAllByRole('slider').first().focus().type('{rightarrow}');
      });
    cy.get('@setFilterValue').should('have.been.called');
  });

  it('handles status filtering', () => {
    // Store in an alias to avoid duplicating the same query
    cy.findByRole('combobox', { name: /^status$/i })
      .should('exist')
      .as('statusCombobox')
      .click();
    cy.findByRole('option', { name: /^approved$/i }).click();
    cy.get('@setFilterValue').should('have.been.calledWith', 'approved');
  });

  it('resets all filters', () => {
    cy.findByRole('button', { name: /reset all filters/i }).click();
    cy.get('@resetColumnFilters').should('have.been.called');
  });
});
