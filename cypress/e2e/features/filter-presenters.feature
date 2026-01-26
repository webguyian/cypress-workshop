Feature: Filter Presenters

  Background:
    Given the user is on the dashboard
    And the filters panel is visible
    And there are multiple presenters in the table

  Scenario: Find presenters using multiple criteria
    When the user filters by name with "Roderic"
    And the user filters by status "approved"
    Then the table should only display presenters matching "Roderic" and "approved"
    And the table should show at least one row

  Scenario: Inform the user when no results match the filters
    When the user filters by name with "NonExistentName123"
    Then the table should display "No results"

  Scenario: Restore the full list by resetting all filters
    When the user filters by name with "NonExistentName123"
    And the user resets all filters
    Then the table should display all presenters
    And all filter inputs should be cleared

