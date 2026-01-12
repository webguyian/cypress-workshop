import { DetailsForm } from '@/components';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { formatPresenterData } from '@/lib/utils';
import { mockPresenters } from '@/const/mocks/presenters';

describe('DetailsForm', () => {
  const mockPresenter = mockPresenters[0];
  const LABELS = {
    topic: 'Topic',
    presenter: 'Presenter',
    email: 'Email',
    company: 'Company',
    duration: 'Duration (min.)',
    date: 'Date',
    status: 'Status'
  };
  const ERRORS = {
    required: {
      topic: 'Topic is required',
      presenter: 'Presenter name is required',
      email: 'Email is required',
      duration: 'Duration is required'
    },
    format: {
      email: 'Invalid email format',
      duration: 'Duration must be between 10 and 120'
    }
  };

  beforeEach(() => {
    const onSubmit = cy.stub().as('onSubmit');
    cy.mount(
      <Sheet defaultOpen>
        <SheetContent side="right">
          <DetailsForm data={mockPresenter} onSubmit={onSubmit} />
        </SheetContent>
      </Sheet>
    );
    // Force the sheet to be visible in the test
    cy.get('[data-slot="sheet-content"]').should('be.visible');
  });

  it('renders with initial data', () => {
    // Check if form fields are populated with initial data
    cy.findByLabelText(LABELS.topic).should('have.value', mockPresenter.topic);
    cy.findByLabelText(LABELS.presenter).should(
      'have.value',
      mockPresenter.name
    );
    cy.findByLabelText(LABELS.email).should('have.value', mockPresenter.email);
    cy.findByLabelText(LABELS.company).should(
      'have.value',
      mockPresenter.company
    );
    cy.findByLabelText(LABELS.duration).should(
      'have.value',
      mockPresenter.duration.toString()
    );

    // Check if date picker shows correct date
    cy.findByLabelText(LABELS.date).should('contain', 'January 1st, 2025');

    // Check if status select shows correct value
    cy.findByLabelText(LABELS.status).should('contain', 'Review');
  });

  it('validates required fields', () => {
    // Clear required fields and trigger validation
    // cy.findByLabelText(LABELS.topic).clear().blur();
    // cy.findByLabelText(LABELS.presenter).clear().blur();
    // cy.findByLabelText(LABELS.email).clear().blur();
    // cy.findByLabelText(LABELS.duration).clear().blur();

    // Check error messages
    // cy.findByText(ERRORS.required.topic).should('be.visible');
    // cy.findByText(ERRORS.required.presenter).should('be.visible');
    // cy.findByText(ERRORS.required.email).should('be.visible');
    // cy.findByText(ERRORS.required.duration).should('be.visible');

    // TODO: Clear required fields and trigger validation
    cy.validateField(LABELS.topic, ERRORS.required.topic);
    cy.validateField(LABELS.presenter, ERRORS.required.presenter);
    cy.validateField(LABELS.email, ERRORS.required.email);
    cy.validateField(LABELS.duration, ERRORS.required.duration);

    // Save button should be disabled
    cy.findByRole('button', { name: /save changes/i }).should('be.disabled');
  });

  it('validates email format', () => {
    // Enter invalid email
    cy.findByLabelText(LABELS.email).clear().type('invalid-email').blur();

    // Check error message
    cy.findByText(ERRORS.format.email).should('be.visible');

    // Enter valid email
    cy.findByLabelText(LABELS.email).clear().type('valid@email.com').blur();

    // Error message should be gone
    cy.findByText(ERRORS.format.email).should('not.exist');
  });

  it('validates duration is greater than 10', () => {
    // Enter invalid duration
    cy.findByLabelText(LABELS.duration).clear().type('0').blur();

    // Check error message
    cy.findByText(ERRORS.format.duration).should('be.visible');

    // Enter valid duration
    cy.findByLabelText(LABELS.duration).clear().type('30').blur();

    // Error message should be gone
    cy.findByText(ERRORS.format.duration).should('not.exist');
  });

  it('handles date picker selection', () => {
    // Open the date picker
    cy.findByLabelText(LABELS.date).click();

    // Wait for calendar to be visible
    cy.findByRole('grid').should('be.visible');

    // TODO: Select a date (20th of the month)
    cy.findByRole('gridcell', { name: /20/ }).click();
    // cy.get('.rdp-day').contains('20').click();

    // Calendar should be closed
    cy.findByRole('grid').should('not.exist');
  });

  it('handles status selection', () => {
    // Open status dropdown
    cy.findByLabelText(LABELS.status).click();

    // TODO: Select a new status
    cy.findByRole('option', { name: /approved/i }).click();
    // cy.findByText('Approved').click();

    // New status should be selected
    cy.findByLabelText(LABELS.status).should('contain', 'Approved');
  });

  it('submits form with updated data', () => {
    // Update form fields
    cy.findByLabelText(LABELS.topic).clear().type('Updated Topic');
    cy.findByLabelText(LABELS.presenter).clear().type('Jane Smith');
    cy.findByLabelText(LABELS.email).clear().type('jane@example.com');
    cy.findByLabelText(LABELS.company).clear().type('New Company');
    cy.findByLabelText(LABELS.duration).clear().type('45');

    // Change status
    cy.findByLabelText(LABELS.status).click();
    cy.findByRole('option', { name: /approved/i }).click();

    // TODO: Submit form
    // cy.findByRole('button', { name: /save changes/i }).click();
    cy.findByButton(/save changes/i).click();

    // Check if onSubmit was called
    cy.get('@onSubmit').should('have.been.called');
    cy.get('@onSubmit').then((stub) => {
      const sinonStub = stub as unknown as sinon.SinonStub;
      const event = sinonStub.getCall(0).args[0];
      const formData = new FormData(event.target as HTMLFormElement);
      const data = formatPresenterData(Object.fromEntries(formData.entries()));

      cy.wrap(data.topic).should('equal', 'Updated Topic');
      cy.wrap(data.name).should('equal', 'Jane Smith');
      cy.wrap(data.email).should('equal', 'jane@example.com');
      cy.wrap(data.company).should('equal', 'New Company');
      cy.wrap(data.duration).should('equal', 45);
    });
  });
});
