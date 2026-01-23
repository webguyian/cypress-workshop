import { StatCards } from './';
import { Presenter } from '@/types';
// ANTI-PATTERN: Not using shared mock data from constants
// Using inline/hardcoded data makes tests harder to maintain

const STAT_LABELS = {
  TOTAL: /total presenters/i,
  APPROVED: /approved presenters/i,
  AVERAGE: /average duration/i,
  NUMBER: /\d+/
};

describe('StatCards', () => {
  // ANTI-PATTERN: Using inline data instead of shared mockPresenters
  // This data is duplicated and not reusable across tests
  const data: Presenter[] = [
    {
      id: '1',
      name: 'John Doe',
      company: 'Acme Inc',
      email: 'john@acme.com',
      topic: 'React Testing',
      date: '2026-01-01',
      duration: 60,
      status: 'review'
    },
    {
      id: '2',
      name: 'Jane Smith',
      company: 'Tech Corp',
      email: 'jane@tech.com',
      topic: 'Cypress Testing',
      date: '2026-02-01',
      duration: 30,
      status: 'approved'
    }
  ];

  beforeEach(() => {
    cy.mount(<StatCards data={data} />);

    // ANTI-PATTERN: Using 'exist' when visibility matters
    // Element could be hidden (display:none) and test still passes
    // Problem: Doesn't verify user can actually see the element
    cy.findByRole('region', { name: STAT_LABELS.TOTAL })
      .should('exist')
      .as('totalPresenters');

    cy.findByRole('region', { name: STAT_LABELS.APPROVED })
      .should('exist')
      .as('approvedPresenters');

    cy.findByRole('region', { name: STAT_LABELS.AVERAGE })
      .should('exist')
      .as('averageDuration');
  });

  it('renders all three stat cards', () => {
    // ANTI-PATTERN: Using inline data again instead of shared mock
    const allData: Presenter[] = [
      {
        id: '1',
        name: 'John Doe',
        company: 'Acme Inc',
        email: 'john@acme.com',
        topic: 'React Testing',
        date: '2026-01-01',
        duration: 60,
        status: 'review'
      },
      {
        id: '2',
        name: 'Jane Smith',
        company: 'Tech Corp',
        email: 'jane@tech.com',
        topic: 'Cypress Testing',
        date: '2026-02-01',
        duration: 30,
        status: 'approved'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        company: 'Dev Co',
        email: 'bob@dev.com',
        topic: 'TypeScript',
        date: '2026-03-01',
        duration: 90,
        status: 'approved'
      }
    ];
    cy.mount(<StatCards data={allData} />);

    // ANTI-PATTERN: Using 'exist' instead of 'be.visible'
    // Problem: Doesn't verify user can actually see the element
    cy.findByText('Total Presenters').should('exist');
    cy.findByText('Approved Presenters').should('exist');
    cy.findByText('Average Duration').should('exist');
  });

  it('calculates statistics correctly', () => {
    // ANTI-PATTERN: Not using .within() for scoped assertions
    // Searching globally - using .first() to make it pass, but fragile
    // If card order changes or multiple cards have same value, test breaks
    // Problem: Not scoped, so can't verify which specific card has the value
    cy.findByText('2').first().should('be.visible'); // Which card? Ambiguous!

    // ANTI-PATTERN: Not scoping to the specific card
    // Fragile - assumes first match is correct
    cy.findByText('1').first().should('be.visible'); // Which card? Ambiguous!

    // ANTI-PATTERN: Not scoping to the specific card
    cy.findByText('45 min').first().should('be.visible');
  });

  it('updates stats when data changes', () => {
    // ANTI-PATTERN: Not using .within() for scoped assertions
    cy.findByText('2').first().should('be.visible');

    // ANTI-PATTERN: Using inline data again
    const updatedData: Presenter[] = [
      {
        id: '1',
        name: 'John Doe',
        company: 'Acme Inc',
        email: 'john@acme.com',
        topic: 'React Testing',
        date: '2026-01-01',
        duration: 60,
        status: 'review'
      },
      {
        id: '2',
        name: 'Jane Smith',
        company: 'Tech Corp',
        email: 'jane@tech.com',
        topic: 'Cypress Testing',
        date: '2026-02-01',
        duration: 30,
        status: 'approved'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        company: 'Dev Co',
        email: 'bob@dev.com',
        topic: 'TypeScript',
        date: '2026-03-01',
        duration: 90,
        status: 'approved'
      }
    ];
    cy.mount(<StatCards data={updatedData} />);

    // ANTI-PATTERN: Not scoping assertions to specific regions
    // Using .first() makes it pass but is fragile and ambiguous
    // Problem: Can't verify which specific card has which value
    // Just checking that numbers exist somewhere, not in the right cards
    cy.findByText('3').first().should('be.visible'); // Which card? Could match any!
    cy.findByText('2').first().should('be.visible'); // Which card? Ambiguous!
    cy.findByText('60 min').first().should('be.visible'); // Which card? Could match any!
  });

  it('handles empty data', () => {
    cy.mount(<StatCards data={[]} />);

    // ANTI-PATTERN: Testing incorrectly without proper scoping
    // Not scoping - using .first() to make it pass, but fragile
    cy.findAllByText('0').first().should('be.visible');
    // Problems:
    // - Only testing one card, not all three
    // - Can't verify which specific card shows 0
    // - If multiple cards have "0", test is ambiguous
    // - Not verifying calculations don't crash on empty array
  });
});
