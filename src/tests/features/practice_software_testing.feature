Feature: Practice Software Testing Website Functionality

  Background: Given the user is on the Practice Software Testing website

  Scenario: Successful user sign-up 
    Given the user is not singed-up yet
    When the user sign-up with valid credentials
    Then the user is redirected to the "Log in" page

  Scenario: Successful User sign-in
    Given the user has a registered account 
    When the user logs in
    Then the user is redirected to the "My account" page

  Scenario: Update User profile information
    Given the user is logged in
    And the user is on the "Profile" page
    When the user updates their personal details 
    And the user saves the changes 
    Then the user should see "Your profile is successfully updated!"
  
  Scenario: View product details page
    Given the user is on main page
    When the user click on a specific product 
    Then the user is redirected to the product page

  Scenario: Add product to basket
    Given the user is on a product details page
    When the user chooses an amount and clicks the "Add to cart" button
    Then the user should see "Product added to shopping cart"
    
  Scenario: Search for exact brand
    Given the user navigates to the main page
    When the user click on checkbox near brand name
    Then the search results display the matching products

  Scenario: Search for multiple product categories
    Given the user starts from the homepage
    When the user checks a few different checkboxes for categories
    Then the search results display products from the chosen categories

  Scenario: Change the website language to another language
    Given the website is in English
    When the user clicks the language selection button
    And chooses a different language from the list
    Then the website should change to the chosen language


