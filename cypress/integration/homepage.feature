Feature: Homepage Presentation

  The homepage should look a certain way

  Background:
    Given I am on the homepage

  Scenario: Heading 1 Typography
    Then heading-1 has the color "rgb(0, 0, 255)"
