Feature: Approve Presenter

  Background:
    Given the user is on the dashboard

  Scenario Outline: Approving a presenter updates status correctly
    Given a presenter with status "<start_status>" exists
    When the user approves the presenter
    Then the presenter status should be "<end_status>"

    Examples:
      | start_status | end_status |
      | review       | approved   |
      | pending      | pending    |
      | rejected     | rejected   |