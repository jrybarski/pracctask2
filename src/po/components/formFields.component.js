class FormFields {
  get emailField() {
    return $('[data-test="email"]');
  }

  get passwordField() {
    return $('[data-test="password"]');
  }

  get firstNameField() {
    return $('[data-test="first-name"]');
  }

  get lastNameField() {
    return $('[data-test="last-name"]');
  }

  get dateField() {
    return $('[data-test="dob"]');
  }

  get streetField() {
    return $('[data-test="street"]');
  }

  get postalCodeField() {
    return $('[data-test="postal_code"]');
  }

  get cityField() {
    return $('[data-test="city"]');
  }

  get stateField() {
    return $('[data-test="state"]');
  }

  get countryField() {
    return $('[data-test="country"]');
  }

  get phoneField() {
    return $('[data-test="phone"]');
  }

  async setEmail(email) {
    await this.emailField.setValue(email);
  }

  async setPassword(password) {
    await this.passwordField.setValue(password);
  }

  async setFirstName(firstName) {
    await this.firstNameField.setValue(firstName);
  }

  async setLastName(lastName) {
    await this.lastNameField.setValue(lastName);
  }

  async setDateOfBirth(date) {
    await this.dateField.setValue(date);
  }

  async setStreet(street) {
    await this.streetField.setValue(street);
  }

  async setPostalCode(postalCode) {
    await this.postalCodeField.setValue(postalCode);
  }

  async setCity(city) {
    await this.cityField.setValue(city);
  }

  async setState(state) {
    await this.stateField.setValue(state);
  }

  async selectCountry(countryValue) {
    await this.countryField.selectByAttribute("value", countryValue);
  }

  async setPhone(phone) {
    await this.phoneField.setValue(phone);
  }
}

module.exports = new FormFields();
