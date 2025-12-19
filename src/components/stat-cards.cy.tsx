import { StatCards } from './';
import { mockPresenters } from '@/const/mocks/presenters';

const STAT_LABELS = {
  TOTAL: /total presenters/i,
  APPROVED: /approved presenters/i,
  AVERAGE: /average duration/i,
  NUMBER: /\d+/
};

describe('StatCards', () => {
  const data = mockPresenters.slice(0, 2);

  beforeEach(() => {
    cy.mount(<StatCards data={data} />);

    cy.findByRole('region', { name: STAT_LABELS.TOTAL })
      .should('be.visible')
      .as('totalPresenters');

    cy.findByRole('region', { name: STAT_LABELS.APPROVED })
      .should('be.visible')
      .as('approvedPresenters');

    cy.findByRole('region', { name: STAT_LABELS.AVERAGE })
      .should('be.visible')
      .as('averageDuration');
  });

  it('renders all three stat cards', () => {
    cy.get('@totalPresenters').should('be.visible');
    cy.get('@approvedPresenters').should('be.visible');
    cy.get('@averageDuration').should('be.visible');
  });

  it('calculates statistics correctly', () => {
    // Total presenters should be 2
    cy.get('@totalPresenters').within(() =>
      cy.findByText('2').should('be.visible')
    );

    // Only one presenter is approved
    cy.get('@approvedPresenters').within(() =>
      cy.findByText('1').should('be.visible')
    );

    // Average duration should be 45 min ((60 + 30) / 2)
    cy.get('@averageDuration').within(() =>
      cy.findByText('45 min').should('be.visible')
    );
  });

  it('updates stats when data changes', () => {
    // Total presenters should be 2 initially
    cy.get('@totalPresenters').within(() =>
      cy.findByText('2').should('be.visible')
    );

    // Rerender with updated data
    cy.mount(<StatCards data={mockPresenters} />);

    // Total presenters
    cy.findByRole('region', { name: STAT_LABELS.TOTAL })
      .should('be.visible')
      .findByText(STAT_LABELS.NUMBER)
      .invoke('text')
      .should('equal', '3');

    // Approved presenters
    cy.findByRole('region', { name: STAT_LABELS.APPROVED })
      .should('be.visible')
      .findByText(STAT_LABELS.NUMBER)
      .invoke('text')
      .should('equal', '2');

    // Average duration ((60 + 30 + 90) / 3)
    cy.findByRole('region', { name: STAT_LABELS.AVERAGE })
      .should('be.visible')
      .findByText(STAT_LABELS.NUMBER)
      .invoke('text')
      .should('equal', '60 min');
  });

  it('handles empty data', () => {
    cy.mount(<StatCards data={[]} />);

    // Should show 0 for all stats
    cy.findByRole('region', { name: STAT_LABELS.TOTAL })
      .should('be.visible')
      .findByText(STAT_LABELS.NUMBER)
      .invoke('text')
      .should('equal', '0');

    cy.findByRole('region', { name: STAT_LABELS.APPROVED })
      .should('be.visible')
      .findByText(STAT_LABELS.NUMBER)
      .invoke('text')
      .should('equal', '0');

    cy.findByRole('region', { name: STAT_LABELS.AVERAGE })
      .should('be.visible')
      .findByText(STAT_LABELS.NUMBER)
      .invoke('text')
      .should('equal', '0 min');
  });
});
