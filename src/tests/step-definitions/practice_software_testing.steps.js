const { Given, When, Then } = require("@wdio/cucumber-framework");
const { assert, expect, should } = require("chai");
should();
const RegisterPage = require("./../../po/pages/register.page");
const LoginPage = require("./../../po/pages/login.page");
const ProfilePage = require("./../../po/pages/profile.page");
const MainPage = require("./../../po/pages/main.page");
const ProductPage = require("../../po/pages/product.page");
const profilePage = new ProfilePage();
const registerPage = new RegisterPage();
const loginPage = new LoginPage();
const mainPage = new MainPage();
const productPage = new ProductPage();

let sharedEmail = `Jkowalski_${Date.now()}@gmail.com`;
let userDetails = {
  firstName: "Jan",
  lastName: "Kowalski",
  dateOfBirth: "01011980",
  street: "Jana Pawla",
  postalCode: "48-300",
  city: "Wroclaw",
  state: "Dolnoslaskie",
  country: "PL",
  phone: "123456789",
  email: `${sharedEmail}`,
  password: "JKowalski123!",
};

// Background
Given("the user is on the Practice Software Testing website", async () => {
  await registerPage.open();
});

// Scenario: Successful user sign-up
Given("the user is not singed-up yet", async () => {
  await registerPage.open();
});

When("the user sign-up with valid credentials", async () => {
  await registerPage.registerUser(userDetails);
});

Then('the user is redirected to the "Log in" page', async () => {
  await browser.pause(2000);
  expect(await browser.getUrl()).to.equal(
    "https://practicesoftwaretesting.com/auth/login"
  );
});

// Scenario: Successful User sign-in
Given("the user has a registered account", async () => {
  await loginPage.open();
});

When("the user logs in", async () => {
  await loginPage.loginUser(userDetails.email, userDetails.password);
});

Then('the user is redirected to the "My account" page', async () => {
  await browser.pause(2000);
  expect(await browser.getUrl()).to.equal(
    "https://practicesoftwaretesting.com/account"
  );
});

// Scenario: Update User profile information
Given("the user is logged in", async () => {
  await loginPage.open();
  await loginPage.loginUser(userDetails.email, userDetails.password);
});

Given('the user is on the "Profile" page', async () => {
  await profilePage.open();
});

When("the user updates their personal details", async () => {
  await browser.pause(2000);
  await profilePage.updateUser("Janek", "Krakowski");
});

When("the user saves the changes", async () => {
  await profilePage.updateProfileButton.click();
});

Then(
  'the user should see "Your profile is successfully updated!"',
  async () => {
    const alertText = await profilePage.updateProfileAlert.getText();
    alertText.should.equal("Your profile is successfully updated!");
  }
);

// Scenario: View product details page
Given("the user is on main page", async () => {
  await mainPage.open();
});

When("the user click on a specific product", async () => {
  await browser.pause(1000);
  await mainPage.combinationPiliers.click();
});

Then("the user is redirected to the product page", async () => {
  await browser.pause(1000);
  assert.isTrue(
    await productPage.combinationPiliers.isDisplayed(),
    "Product image should be displayed"
  );
});

// Scenario: Add product to basket
Given("the user is on a product details page", async () => {
  await mainPage.open();
  await browser.pause(1000);
  await mainPage.combinationPiliers.click();
});

When(
  'the user chooses an amount and clicks the "Add to cart" button',
  async () => {
    await productPage.productQuantity.setValue("2");
    await productPage.addToCard.click();
  }
);

Then('the user should see "Product added to shopping cart"', async () => {
  await browser.pause(2000);
  const toastText = await productPage.toast.getText();
  expect(toastText).to.equal("Product added to shopping cart.");
});

// Scenario: Search for exact brand
Given("the user navigates to the main page", async () => {
  await mainPage.open();
});

When("the user click on checkbox near brand name", async () => {
  await mainPage.brandCheckbox.click();
});

Then("the search results display the matching products", async () => {
  expect(await mainPage.hammer.isDisplayed()).to.be.true;
});

// Scenario: Search for multiple product categories
Given("the user starts from the homepage", async () => {
  await mainPage.open();
});

When("the user checks a few different checkboxes for categories", async () => {
  await mainPage.category1.click();
  await mainPage.category2.click();
});

Then(
  "the search results display products from the chosen categories",
  async () => {
    await browser.pause(2000);
    expect(await await mainPage.hammer.isDisplayed()).to.be.true;
    expect(await await mainPage.woodSaw.isDisplayed()).to.be.true;
  }
);

// Scenario: Change the website language to another language
Given("the website is in English", async () => {
  await mainPage.open();
});

When("the user clicks the language selection button", async () => {
  await mainPage.languageButton.waitForClickable({ timeout: 5000 });
  await mainPage.languageButton.click();
});

When("chooses a different language from the list", async () => {
  await browser.pause(1000);
  await mainPage.languageFrButton.click();
});

Then("the website should change to the chosen language", async () => {
  await browser.pause(1500);
  const navText = await mainPage.navHome.getText();
  expect(navText).to.equal("Accueil");
});
