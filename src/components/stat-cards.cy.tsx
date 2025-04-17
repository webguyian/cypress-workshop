import { StatCards } from './';
import { Presenter } from '@/types';

describe('StatCards', () => {
  const mockPresenters: Presenter[] = [
    {
      id: '1',
      name: 'John Doe',
      company: 'Test Co',
      email: 'john@test.com',
      topic: 'Testing',
      date: '2025-04-17',
      duration: 60,
      status: 'approved'
    },
    {
      id: '2',
      name: 'Jane Smith',
      company: 'Dev Co',
      email: 'jane@test.com',
      topic: 'Development',
      date: '2025-04-18',
      duration: 30,
      status: 'pending'
    }
  ];

  it('renders all three stat cards', () => {
    cy.mount(<StatCards data={mockPresenters} />);

    cy.findByText('Total Presenters').should('exist');
    cy.findByText('Approved Presenters').should('exist');
    cy.findByText('Average Duration').should('exist');
  });

  it('calculates statistics correctly', () => {
    cy.mount(<StatCards data={mockPresenters} />);

    // Total presenters should be 2
    cy.findByText('2').should('exist');

    // Only one presenter is approved
    cy.findByText('1').should('exist');

    // Average duration should be 45 min ((60 + 30) / 2)
    cy.findByText('45 min').should('exist');
  });

  it('updates stats when data changes', () => {
    cy.mount(<StatCards data={mockPresenters} />);

    // Initial check
    cy.findByText('2').should('exist'); // Total presenters

    // Add another approved presenter
    const updatedPresenters = [
      ...mockPresenters,
      {
        id: '3',
        name: 'Bob Wilson',
        company: 'Test Co',
        email: 'bob@test.com',
        topic: 'Testing',
        date: '2025-04-19',
        duration: 90,
        status: 'approved'
      }
    ];

    // Rerender with updated data
    cy.mount(<StatCards data={updatedPresenters} />);

    // Check updated stats
    cy.findByText('3').should('exist'); // Total presenters
    cy.findByText('2').should('exist'); // Approved presenters
    cy.findByText('60 min').should('exist'); // Average duration ((60 + 30 + 90) / 3)
  });

  xit('handles empty data', () => {
    cy.mount(<StatCards data={[]} />);

    // Should show 0 for all stats
    cy.findByText('0').should('exist'); // Total presenters
    cy.findByText('0').should('exist'); // Approved presenters
    cy.findByText('0 min').should('exist'); // Average duration
  });
});
