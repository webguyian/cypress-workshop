Feature: Filter Presenters

  Scenario: Filter by name and status
    Given the user is on the dashboard
    When the user clicks the toggle filters button
    Then the filter name input should be visible
    When the user types "Roderic" into the search name input
    And the user selects "approved" from the status dropdown
    Then the table should show 1 row
    And the first row should contain "Roderic" and "approved"

  Scenario: Reset all filters
    Given the user is on the dashboard
    When the user clicks the toggle filters button
    And the user types "Roderic" into the search name input
    And the user clicks the reset all filters button
    Then the search name input should be empty
    And there should be more than 1 row in the table
