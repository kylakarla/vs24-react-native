Feature: Sign Up functionality
  As a new user
  I want to create an account
  So that I can access the app

  Scenario: User can fill in the Sign Up form
    Given the user opens the Sign Up page
    When the user enters "Karl" into the name field
    And the user enters "test@example.com" into the email field
    And the user enters "123456" into the password field
    Then the Sign Up button should be enabled

  Scenario: User can navigate to Sign In page
    Given the user opens the Sign Up page
    When the user clicks "Sign In" link
    Then the Sign In page should open

  Scenario: Empty form does not submit
    Given the user opens the Sign Up page
    When the user clicks the Sign Up button
    Then the user should remain on the Sign Up page
