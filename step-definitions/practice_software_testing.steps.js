const { Given, When, Then } = require("@wdio/cucumber-framework");

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
  await expect(browser).toHaveUrl(
    "https://practicesoftwaretesting.com/auth/login"
  );
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
  await expect(browser).toHaveUrl(
    "https://practicesoftwaretesting.com/account"
  );
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
    await expect(alert).toBeDisplayed();
    await expect(alert).toHaveText("Your profile is successfully updated!");
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
  await expect(productImage).toBeDisplayed();
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
  const toast = await $("div.toast-message");
  await expect(toast).toBeDisplayed();
  await expect(toast).toHaveText("Product added to shopping cart.");
});

// Scenario: Search for exact brand
Given("the user navigates to the main page", async () => {
  await browser.url("/");
});

When("the user click on checkbox near brand name", async () => {
  const brandCheckbox = await $(
    " #filters > fieldset:nth-child(16) > div:nth-child(2) > label > input"
  );
  await brandCheckbox.click();
});

Then("the search results display the matching products", async () => {
  await expect($('img[alt="Hammer"]')).toBeDisplayed();
});

// Scenario: Search for multiple product categories
Given("the user starts from the homepage", async () => {
  await browser.url("/");
});

When("the user checks a few different checkboxes for categories", async () => {
  await $(
    " #filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(2) > label > input"
  ).click();
  await $(
    "#filters > fieldset:nth-child(13) > div:nth-child(2) > ul > fieldset > div:nth-child(3) > label > input"
  ).click();
});

Then(
  "the search results display products from the chosen categories",
  async () => {
    await expect($('img[alt="Hammer"]')).toBeDisplayed();
    await expect($('img[alt="Wood Saw"]')).toBeDisplayed();
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
  await expect($('[data-test="nav-home"]')).toHaveText("Accueil");
});
