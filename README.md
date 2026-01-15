# Cypress Workshop

This project is a hands-on Cypress workshop using React, TypeScript, and Vite. It demonstrates best practices for both E2E and component testing.

## E2E Scenarios Covered

- **Approve Presenter**: Approving a presenter updates their status correctly.
- **Edit Presenter**: Editing presenter details, including validation for required fields.
- **Filter Presenters**: Combining filters, handling empty results, and resetting filters.

## Component Test Scenarios

- **StatCards**: Renders presenter statistics and validates display.
- **PresenterTableFilters**: Interacts with table filters and resets.
- **DataTable**: Displays presenter data and supports table interactions.
- **DetailsForm**: Handles form validation, editing, and error states.
- **ActionCell**: Tests row actions like edit, approve, and reject.

## Best Practices Demonstrated

- Use of Cypress for both E2E and component testing
- Test isolation and use of fixtures/mocks
- Accessibility queries (e.g., `findByRole`)
- Validation of UI state and error handling
- Modular test utilities for table and form components

---

## Running Tests

You can run tests using the following npm scripts:

### Run all tests (E2E and component)

```sh
npm run test:all
```

### Run E2E tests

```sh
npm run test:e2e
```

### Run component tests

```sh
npm run test:component
```

### Open Cypress interactive UI

```sh
npm run cypress:open
```

---

## Code Coverage

You can generate code coverage reports for both E2E and component tests.

### Run all tests and generate coverage report

```sh
npm run coverage:full
```

The report will be generated in the `coverage/` directory after the tests complete.

---

For more examples and best practices, explore:

- The `cypress/e2e` directory for E2E test definitions and feature files
- The `src/components` directory for component code and component tests
- The `cypress/support` directory for custom Cypress commands and test utilities
