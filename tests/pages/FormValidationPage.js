const config = require('../config/test-config');
const { submitForm } = require('../utils/form-helpers');

class FormValidationPage {
  constructor(page) {
    this.page = page;
    // Required form
    this.requiredName = page.locator('#required-name');
    this.requiredEmail = page.locator('#required-email');
    this.requiredNameError = page.locator('#required-name-error');
    this.requiredEmailError = page.locator('#required-email-error');
    this.requiredFormResult = page.locator('#required-form-result');
    // Custom form
    this.customPassword = page.locator('#custom-password');
    this.customAge = page.locator('#custom-age');
    this.customUrl = page.locator('#custom-url');
    this.customPasswordError = page.locator('#custom-password-error');
    this.customAgeError = page.locator('#custom-age-error');
    this.customUrlError = page.locator('#custom-url-error');
    this.customFormResult = page.locator('#custom-form-result');
    // Real-time validation
    this.realtimeInput = page.locator('#realtime-input');
    this.realtimeError = page.locator('#realtime-error');
    this.realtimeSuccess = page.locator('#realtime-success');
  }

  async goto() {
    await this.page.goto(`${config.baseURL}${config.pages.formValidation}`);
  }

  async getTitle() {
    return this.page.locator('h1');
  }

  async submitRequiredForm() {
    await submitForm(this.page, 'required-form');
  }

  async fillRequiredForm(name, email) {
    await this.requiredName.fill(name);
    await this.requiredEmail.fill(email);
  }

  async submitCustomForm() {
    await submitForm(this.page, 'custom-form');
  }

  async fillCustomForm(password, age, url) {
    if (password) await this.customPassword.fill(password);
    if (age) await this.customAge.fill(age.toString());
    if (url) await this.customUrl.fill(url);
  }

  async typeRealtimeInput(value) {
    await this.realtimeInput.fill(value);
  }
}

module.exports = FormValidationPage;

