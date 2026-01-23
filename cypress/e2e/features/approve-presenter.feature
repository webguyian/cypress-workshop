Feature: Approve Presenter

  Scenario: Approve a presenter in review
    Given the user is on the dashboard
    And a presenter with review status exists
    When the user clicks the approve button
    Then the status should change to approved

  Scenario: Do not approve a pending presenter
    Given the user is on the dashboard
    And a presenter with pending status exists
    When the user clicks the approve button
    Then the status should still be pending

  Scenario: Do not approve a rejected presenter
    Given the user is on the dashboard
    And a presenter with rejected status exists
    When the user clicks the approve button
    Then the status should still be rejected
