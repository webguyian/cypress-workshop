Feature: Edit Presenter

  Background:
    Given the user is on the dashboard
    And a presenter exists in the table

  Scenario: Editing a presenter and updating multiple fields
    When the user edits the presenter
    And the user updates the topic to "New Topic"
    And the user updates the duration to "90"
    And the user saves the changes
    Then the presenter details should be updated
    And a success message should be displayed

  Scenario: Editing a presenter and removing a required field shows validation error
    When the user edits the presenter
    And the user removes the duration field value
    Then a validation error for duration should be displayed
    And the save changes button should be disabled

  Scenario: Editing a presenter and closing without saving preserves original data
    When the user edits the presenter
    And the user updates the topic to "Changed Topic"
    And the user closes the modal without saving
    Then the presenter details should remain unchanged

