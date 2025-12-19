import { PresenterTableFilters } from '@/components/presenter-table-filters';
import { useTestTableInstance } from '../../cypress/support/table-test-utils';
import { Table } from '@tanstack/react-table';
import { Presenter } from '@/types';

// Complex regex patterns that are not human-readable
const DATE_PATTERNS = {
  DAY_15: /15/i,
  DAY_20: /20/i,
  DAY_15_LABEL: /(\w+)\s+15,\s+(\d{4})/
};

// Function to create dynamic date button regex pattern
const createDateButtonPattern = (month: string, year: string, day: number) =>
  new RegExp(`${month}\\s+${day},\\s+${year}`, 'i');

// Label text constants
const DURATION_LABEL = 'Duration range';

// Regex patterns for role-based selectors
const ROLE_PATTERNS = {
  NAME: /^name$/i,
  TOPIC: /^topic$/i,
  STATUS: /^status$/i,
  APPROVED: /^approved$/i,
  DATE_RANGE_PICKER: /date range picker/i,
  RESET_FILTERS: /reset all filters/i
} as const;

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
    cy.findByRole('textbox', { name: ROLE_PATTERNS.NAME })
      .should('be.visible')
      .should('have.value', '')
      .type('J');
    cy.get('@setFilterValue').should('have.been.calledWith', 'J');
  });

  it('handles topic input filtering', () => {
    cy.findByRole('textbox', { name: ROLE_PATTERNS.TOPIC })
      .should('be.visible')
      .should('be.enabled')
      .type('R');
    cy.get('@setFilterValue').should('have.been.calledWith', 'R');
  });

  it('handles date range filtering', () => {
    cy.findByRole('button', { name: ROLE_PATTERNS.DATE_RANGE_PICKER }).click();
    cy.findByRole('dialog').should('be.visible');

    cy.findAllByRole('button', { name: DATE_PATTERNS.DAY_15 })
      .first()
      .should('be.visible')
      .then(($firstButton) => {
        const firstAriaLabel = $firstButton.attr('aria-label') || '';
        const firstMatch = firstAriaLabel.match(DATE_PATTERNS.DAY_15_LABEL);
        if (firstMatch) {
          const [, month, year] = firstMatch;
          cy.wrap($firstButton).click();
          cy.findByRole('dialog').should('be.visible');
          cy.findAllByRole('button', {
            name: createDateButtonPattern(month, year, 20)
          })
            .first()
            .should('be.visible')
            .click();
        } else {
          cy.wrap($firstButton).click();
          cy.findByRole('dialog').should('be.visible');
          cy.findAllByRole('button', { name: DATE_PATTERNS.DAY_20 })
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
    cy.findByLabelText(DURATION_LABEL)
      .parent()
      .within(() => {
        cy.findAllByRole('slider').first().focus().type('{rightarrow}');
      });
    cy.get('@setFilterValue').should('have.been.called');
  });

  it('handles status filtering', () => {
    cy.findByRole('combobox', { name: ROLE_PATTERNS.STATUS })
      .should('be.visible')
      .click();
    cy.findByRole('option', { name: ROLE_PATTERNS.APPROVED }).click();
    cy.get('@setFilterValue').should('have.been.calledWith', 'approved');
  });

  it('resets all filters', () => {
    cy.findByRole('button', { name: ROLE_PATTERNS.RESET_FILTERS }).click();
    cy.get('@resetColumnFilters').should('have.been.called');
  });
});
