const FormFields = require("./../components/formFields.component");

class LoginPage {
  async open() {
    await browser.url("/auth/login");
  }
  get loginSubmitButton() {
    return $('[data-test="login-submit"]');
  }
  async loginUser(email, password) {
    await FormFields.setEmail(email);
    await FormFields.setPassword(password);
    await this.loginSubmitButton.click();
  }
}

module.exports = LoginPage;
