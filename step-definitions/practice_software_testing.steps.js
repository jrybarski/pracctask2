const { Given, When, Then } = require("@wdio/cucumber-framework");
const { assert, expect, should } = require("chai");
should();

let sharedEmail = "";

// Background
Given("the user is on the Practice Software Testing website", async () => {
  await browser.url("/");
  await browser.maximizeWindow();
});

// Scenario: Successful user sign-up
Given("the user is not singed-up yet", async () => {
  await browser.url("/auth/register");
  await browser.maximizeWindow();
});

When("the user sign-up with valid credentials", async () => {
  sharedEmail = `Jkowalski_${Date.now()}@gmail.com`;

  await $('[data-test="first-name"]').setValue("Jan");
  await $('[data-test="last-name"]').setValue("Kowalski");
  await $('[data-test="dob"]').setValue("01011980");
  await $('[data-test="street"]').setValue("Jana Pawla");
  await $('[data-test="postal_code"]').setValue("48-300");
  await $('[data-test="city"]').setValue("Wroclaw");
  await $('[data-test="state"]').setValue("Dolnoslaskie");
  await $('[data-test="country"]').selectByAttribute("value", "PL");
  await $('[data-test="phone"]').setValue("123456789");
  await $('[data-test="email"]').setValue(sharedEmail);
  await $('[data-test="password"]').setValue("JKowalski123!");
  await $('[data-test="register-submit"]').click();
});

Then('the user is redirected to the "Log in" page', async () => {
  await browser.pause(2000);
  const expectedUrl = "https://practicesoftwaretesting.com/auth/login";
  const currentUrl = await browser.getUrl();
  assert.equal(currentUrl, expectedUrl, "URL should match the login page");
  expect(currentUrl).to.equal(expectedUrl);
  currentUrl.should.equal(expectedUrl);
});

// Scenario: Successful User sign-in
Given("the user has a registered account", async () => {
  await browser.url("/auth/login");
});

When("the user logs in", async () => {
  await $('[data-test="email"]').setValue(sharedEmail);
  await $('[data-test="password"]').setValue("JKowalski123!");
  await $('[data-test="login-submit"]').click();
});

Then('the user is redirected to the "My account" page', async () => {
  await browser.pause(2000);
  const expectedUrl = "https://practicesoftwaretesting.com/account";
  const currentUrl = await browser.getUrl();
  assert.equal(currentUrl, expectedUrl, "URL should match the account page");
  expect(currentUrl).to.equal(expectedUrl);
  currentUrl.should.equal(expectedUrl);
});

// Scenario: Update User profile information
Given("the user is logged in", async () => {
  await browser.url("/auth/login");
  await $('[data-test="email"]').setValue(sharedEmail);
  await $('[data-test="password"]').setValue("JKowalski123!");
  await $('[data-test="login-submit"]').click();
});

Given('the user is on the "Profile" page', async () => {
  await browser.url("/account/profile");
});

When("the user updates their personal details", async () => {
  await browser.pause(2000);
  await $('[data-test="first-name"]').setValue("Janek");
  await $('[data-test="last-name"]').setValue("Kovalski");
});

When("the user saves the changes", async () => {
  await $('[data-test="update-profile-submit"]').click();
});

Then(
  'the user should see "Your profile is successfully updated!"',
  async () => {
    const alert = await $("div.alert.alert-success.mt-3");
    const alertText = await alert.getText();
    assert.isTrue(await alert.isDisplayed(), "Alert should be displayed");
    assert.equal(
      alertText,
      "Your profile is successfully updated!",
      "Alert text should match"
    );
    expect(await alert.isDisplayed()).to.be.true;
    expect(alertText).to.equal("Your profile is successfully updated!");
    (await alert.isDisplayed()).should.be.true;
    alertText.should.equal("Your profile is successfully updated!");
  }
);

// Scenario: View product details page
Given("the user is on main page", async () => {
  await browser.url("/");
});

When("the user click on a specific product", async () => {
  await browser.pause(1000);
  await $('img[alt="Combination Pliers"]').click();
});

Then("the user is redirected to the product page", async () => {
  await browser.pause(1000);
  const productImage = await $('img[alt="Combination Pliers"]');
  assert.isTrue(
    await productImage.isDisplayed(),
    "Product image should be displayed"
  );
  expect(await productImage.isDisplayed()).to.be.true;
  (await productImage.isDisplayed()).should.be.true;
});

// Scenario: Add product to basket
Given("the user is on a product details page", async () => {
  await browser.url("/");
  await browser.pause(1000);
  await $('img[alt="Combination Pliers"]').click();
});

When(
  'the user chooses an amount and clicks the "Add to cart" button',
  async () => {
    await $('[data-test="quantity"]').setValue("2");
    await $('[data-test="add-to-cart"]').click();
  }
);

Then('the user should see "Product added to shopping cart"', async () => {
  await browser.pause(2000);
  const toast = await $("div.toast-message");
  const toastText = await toast.getText();
  assert.isTrue(await toast.isDisplayed(), "Toast message should be displayed");
  assert.equal(
    toastText,
    "Product added to shopping cart.",
    "Toast text should match"
  );
  expect(await toast.isDisplayed()).to.be.true;
  expect(toastText).to.equal("Product added to shopping cart.");
  (await toast.isDisplayed()).should.be.true;
  toastText.should.equal("Product added to shopping cart.");
});

// Scenario: Search for exact brand
Given("the user navigates to the main page", async () => {
  await browser.url("/");
});

When("the user click on checkbox near brand name", async () => {
  const brandCheckbox = await $(
    "#filters > fieldset:nth-child(16) > div:nth-child(2) > label > input"
  );
  await brandCheckbox.click();
});

Then("the search results display the matching products", async () => {
  const hammerImage = await $('img[alt="Hammer"]');
  assert.isTrue(
    await hammerImage.isDisplayed(),
    "Hammer product should be displayed"
  );
  expect(await hammerImage.isDisplayed()).to.be.true;
  (await hammerImage.isDisplayed()).should.be.true;
});

// Scenario: Search for multiple product categories
Given("the user starts from the homepage", async () => {
  await browser.url("/");
});

When("the user checks a few different checkboxes for categories", async () => {
  await $(
    "#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(2) > label > input"
  ).click();
  await $(
    "#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(3) > label > input"
  ).click();
});

Then(
  "the search results display products from the chosen categories",
  async () => {
    await browser.pause(2000);
    const hammerImage = await $('img[alt="Hammer"]');
    const woodSawImage = await $('img[alt="Wood Saw"]');
    assert.isTrue(
      await hammerImage.isDisplayed(),
      "Hammer product should be displayed"
    );
    assert.isTrue(
      await woodSawImage.isDisplayed(),
      "Wood Saw product should be displayed"
    );
    expect(await hammerImage.isDisplayed()).to.be.true;
    expect(await woodSawImage.isDisplayed()).to.be.true;
    (await hammerImage.isDisplayed()).should.be.true;
    (await woodSawImage.isDisplayed()).should.be.true;
  }
);

// Scenario: Change the website language to another language
Given("the website is in English", async () => {
  await browser.url("/");
  await browser.maximizeWindow();
});

When("the user clicks the language selection button", async () => {
  const languageButton = $('[data-test="language-select"]');
  await languageButton.waitForClickable({ timeout: 5000 });
  await languageButton.click();
});

When("chooses a different language from the list", async () => {
  await browser.pause(1000);
  await $('[data-test="lang-fr"]').click();
});

Then("the website should change to the chosen language", async () => {
  await browser.pause(1500);
  const navHome = await $('[data-test="nav-home"]');
  const navText = await navHome.getText();
  assert.equal(navText, "Accueil", "Navigation text should be in French");
  expect(navText).to.equal("Accueil");
  navText.should.equal("Accueil");
});
