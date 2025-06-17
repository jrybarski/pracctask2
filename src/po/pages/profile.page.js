const FormFields = require("./../components/formFields.component");

class ProfilePage {
  async open() {
    await browser.url("/account/profile");
  }
  get updateProfileButton() {
    return $('[data-test="update-profile-submit"]');
  }
  async updateUser(firstName, lastName) {
    await FormFields.setFirstName(firstName);
    await FormFields.setLastName(lastName);
  }
  get updateProfileAlert() {
    return $("div.alert.alert-success.mt-3");
  }
}

module.exports = ProfilePage;
