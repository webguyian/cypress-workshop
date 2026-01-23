Feature: Edit Presenter

  Scenario: Update presenter details
    Given the user is on the dashboard
    And the table has loaded data
    When the user clicks the actions button on the first row
    And the user clicks the edit menu item
    And the user types "New Topic" into the topic input
    And the user types "New Presenter" into the presenter input
    And the user clicks the save button
    Then the first row should have "New Topic" in the second column
    And the first row should have "New Presenter" in the first column

  Scenario: Validation error for required fields
    Given the user is on the dashboard
    And the table has loaded data
    When the user clicks the actions button on the first row
    And the user clicks the edit menu item
    And the user clears the duration input
    Then the error "Duration is required" should be visible
    And the save button should be disabled
