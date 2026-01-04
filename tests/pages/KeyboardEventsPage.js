const config = require('../config/test-config');

class KeyboardEventsPage {
  constructor(page) {
    this.page = page;
    this.keyName = page.locator('#key-name');
    this.keyCode = page.locator('#key-code');
    this.keyKeycode = page.locator('#key-keycode');
    this.keyShift = page.locator('#key-shift');
    this.keyCtrl = page.locator('#key-ctrl');
    this.keyAlt = page.locator('#key-alt');
    this.keyboardInput = page.locator('#keyboard-input');
    this.inputEvents = page.locator('#input-events');
    this.arrowCounter = page.locator('#arrow-counter');
    this.shortcutFeedback = page.locator('#shortcut-feedback');
  }

  async goto() {
    await this.page.goto(`${config.baseURL}${config.pages.keyboardEvents}`);
  }

  async getTitle() {
    return this.page.locator('h1');
  }

  async typeInInput(value) {
    await this.keyboardInput.click();
    await this.keyboardInput.type(value);
  }

  async pressKey(key) {
    await this.page.keyboard.press(key);
  }

  async clickBody() {
    await this.page.locator('body').click();
  }
}

module.exports = KeyboardEventsPage;

