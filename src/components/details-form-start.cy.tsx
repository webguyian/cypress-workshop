import { DetailsForm } from '@/components';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
    // ANTI-PATTERN: Using fixed wait when test is flaky
    cy.wait(200);
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

    cy.findByLabelText(LABELS.date).should('exist');
    cy.findByLabelText(LABELS.status).should('exist');
  });

  it('validates required fields', () => {
    // ANTI-PATTERN: Clearing fields and blurring, but doesn't understand why blur is needed
    cy.findByLabelText(LABELS.topic).clear().blur();
    cy.findByLabelText(LABELS.presenter).clear().blur();
    cy.findByLabelText(LABELS.email).clear().blur();
    cy.findByLabelText(LABELS.duration).clear().blur();

    cy.findByText(ERRORS.required.topic).should('exist');
    cy.findByText(ERRORS.required.presenter).should('exist');
    cy.findByText(ERRORS.required.email).should('exist');
    cy.findByText(ERRORS.required.duration).should('exist');

    // Save button should be disabled
    cy.findByRole('button', { name: /save changes/i }).should('be.disabled');
  });

  it('validates email format', () => {
    // Enter invalid email
    cy.findByLabelText(LABELS.email).clear().type('invalid-email').blur();

    // Check error message
    cy.findByText(ERRORS.format.email).should('be.visible');
  });

  it('validates duration is greater than 10', () => {
    // Enter valid duration
    cy.findByLabelText(LABELS.duration).clear().type('30').blur();

    // Error message should not be visible
    cy.findByText(ERRORS.format.duration).should('not.exist');
  });

  it('handles date picker selection', () => {
    cy.findByLabelText(LABELS.date).click();
    cy.wait(300);
    cy.findByRole('gridcell', { name: /20/ }).click();

    // Doesn't verify popover closed - just assumes it did
  });

  it('handles status selection', () => {
    cy.findByLabelText(LABELS.status).click();
    cy.findByRole('option', { name: /approved/i }).click();
  });

  it('submits form with updated data', () => {
    cy.findByLabelText(LABELS.topic).clear().type('Updated Topic');
    cy.findByLabelText(LABELS.presenter).clear().type('Jane Smith');
    cy.findByLabelText(LABELS.email).clear().type('jane@example.com');
    cy.findByLabelText(LABELS.company).clear().type('New Company');
    cy.findByLabelText(LABELS.duration).clear().type('45');

    // Change status
    cy.findByLabelText(LABELS.status).click();

    cy.findByRole('option', { name: /approved/i }).click();
    cy.findByRole('button', { name: /save changes/i }).click();

    cy.get('@onSubmit').should('have.been.called');
  });
});
