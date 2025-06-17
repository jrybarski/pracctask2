const FormFields = require("./../components/formFields.component");

class RegisterPage {
  async open() {
    await browser.url("/auth/register");
  }
  get submitButton() {
    return $('[data-test="register-submit"]');
  }

  async registerUser(details) {
    await FormFields.setFirstName(details.firstName);
    await FormFields.setLastName(details.lastName);
    await FormFields.setDateOfBirth(details.dateOfBirth);
    await FormFields.setStreet(details.street);
    await FormFields.setPostalCode(details.postalCode);
    await FormFields.setCity(details.city);
    await FormFields.setState(details.state);
    await FormFields.selectCountry(details.country);
    await FormFields.setPhone(details.phone);
    await FormFields.setEmail(details.email);
    await FormFields.setPassword(details.password);
    await this.submitButton.click();
  }
}

module.exports = RegisterPage;
