import { mockPresenters } from '@/const/mocks/presenters';
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/presenter-table-columns';
import { useTestTableInstance } from '../../cypress/support/table-test-utils';
import { format } from 'date-fns';

const TABLE_COLUMNS = {
  NAME: 0,
  TOPIC: 1,
  DATE: 2,
  DURATION: 3,
  STATUS: 4,
  ACTIONS: 5
} as const;

describe('DataTable', () => {
  const DataTableTest = () => {
    const table = useTestTableInstance();
    return <DataTable columns={columns} table={table} />;
  };

  beforeEach(() => {
    cy.mount(<DataTableTest />);
  });

  it('renders the table with correct data', () => {
    cy.findByRole('table').should('be.visible');
    cy.findAllByRole('columnheader').should('have.length', columns.length);
    cy.findByRole('table').within(() => {
      cy.findAllByRole('row').should('have.length', mockPresenters.length + 1); // +1 for header row
    });

    const firstPresenter = mockPresenters[0];
    const formattedDate = format(new Date(`${firstPresenter.date}T00:00:00`), 'PPP');
    cy.findByRole('table').within(() => {
      cy.findAllByRole('row').eq(1).within(() => {
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.NAME).should('contain', firstPresenter.name);
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.TOPIC).should('contain', firstPresenter.topic);
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.DATE).should('contain', formattedDate);
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.DURATION).should('contain', firstPresenter.duration.toString());
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.STATUS).should('contain', firstPresenter.status);
      });
    });
  });

  it('sorts columns correctly', () => {
    // Sort by name ascending
    const sortedByName = [...mockPresenters].sort((a, b) => a.name.localeCompare(b.name));
    cy.findByRole('columnheader', { name: /^name$/i }).click();
    cy.findByRole('table').within(() => {
      cy.findAllByRole('row').eq(1).should('contain', sortedByName[0].name);
    });

    // Sort by duration ascending
    const sortedByDate = [...mockPresenters].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    cy.findByRole('columnheader', { name: /^date$/i }).click();
    cy.findByRole('table').within(() => {
      cy.findAllByRole('row').eq(1).should('contain', sortedByDate[0].name);
    });

    // Sort by duration ascending
    const sortedByDurationAsc = [...mockPresenters].sort((a, b) => b.duration - a.duration);
    cy.findByRole('columnheader', { name: /^duration/i }).click();
    cy.findByRole('table').within(() => {
      cy.findAllByRole('row').eq(1).within(() => {
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.NAME).should('contain', sortedByDurationAsc[0].name);
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.DURATION).should('contain', sortedByDurationAsc[0].duration.toString());
      });
    });
    
    // Sort by duration descending (on second click)
    const sortedByDurationDesc = [...mockPresenters].sort((a, b) => a.duration - b.duration);
    cy.findByRole('columnheader', { name: /^duration/i }).click();
    cy.findByRole('table').within(() => {
      cy.findAllByRole('row').eq(1).within(() => {
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.NAME).should('contain', sortedByDurationDesc[0].name);
        cy.findAllByRole('cell').eq(TABLE_COLUMNS.DURATION).should('contain', sortedByDurationDesc[0].duration.toString());
      });
    });

    const sortedByStatus = [...mockPresenters].sort((a, b) => a.status.localeCompare(b.status));
    cy.findByRole('columnheader', { name: /^status$/i }).click();
    cy.findByRole('table').within(() => {
      cy.findAllByRole('row').eq(1).should('contain', sortedByStatus[0].status);
    });
  });
});
