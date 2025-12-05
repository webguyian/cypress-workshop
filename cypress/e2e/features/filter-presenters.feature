Feature: Filter Presenters

  Background:
    Given the user is on the dashboard
    And the filters panel is visible
    And there are multiple presenters in the table

  Scenario: Combining multiple filters displays matching presenters
    When the user filters by name with "Roderic"
    And the user filters by status "approved"
    Then the table should only display presenters matching all filter criteria
    And the table should show at least one row

  Scenario: Filters with no matches display empty state
    When the user filters by name with "NonExistentName123"
    Then the table should display "No results"

  Scenario: Resetting filters clears all filters and displays all presenters
    When the user filters by name with "NonExistentName123"
    And the user resets all filters
    Then the table should display all presenters
    And all filter inputs should be cleared

