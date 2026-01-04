const config = require('../config/test-config');

class MainPage {
  constructor(page) {
    this.page = page;
    // Form elements
    this.radioOption1 = page.locator('input[value="option1"]');
    this.radioResult = page.locator('#radio-result');
    this.checkbox1 = page.locator('input[name="checkbox"][value="item1"]');
    this.checkbox2 = page.locator('input[name="checkbox"][value="item2"]');
    this.checkboxResult = page.locator('#checkbox-result');
    this.dropdown = page.locator('#dropdown');
    this.dropdownResult = page.locator('#dropdown-result');
    this.textInputSimple = page.locator('#text-input-simple');
    this.textInputResult = page.locator('#text-input-result');
    // Text transformation
    this.textInput = page.locator('#text-input');
    this.transformBtn = page.locator('#transform-btn');
    this.originalText = page.locator('#original-text');
    this.hexText = page.locator('#hex-text');
    // Delayed action
    this.delayBtn = page.locator('#delay-btn');
    this.delayStatus = page.locator('#delay-status');
    this.delayResult = page.locator('#delay-result');
    // UI components
    this.tab2 = page.locator('.tab-btn[data-tab="tab2"]');
    this.tab2Content = page.locator('#tab2');
    this.accordionBtn = page.locator('.accordion-btn').first();
    this.accordionContent = page.locator('.accordion-content').first();
    this.modalOpenBtn = page.locator('#modal-open-btn');
    this.modal = page.locator('#modal');
    this.modalClose = page.locator('.modal-close');
    // Progress bar
    this.progressStartBtn = page.locator('#progress-start-btn');
    this.progressBar = page.locator('#progress-bar');
    this.progressStatus = page.locator('#progress-status');
  }

  async goto() {
    await this.page.goto(`${config.baseURL}${config.pages.main}`);
  }

  async getTitle() {
    return this.page.locator('h1');
  }

  // Radio button methods
  async selectRadioOption(option) {
    const radio = this.page.locator(`input[value="${option}"]`);
    await radio.scrollIntoViewIfNeeded();
    await radio.check();
  }

  // Checkbox methods
  async selectCheckboxes(...items) {
    for (const item of items) {
      const checkbox = this.page.locator(`input[name="checkbox"][value="${item}"]`);
      await checkbox.scrollIntoViewIfNeeded();
      await checkbox.check();
    }
  }

  // Dropdown methods
  async selectDropdownOption(option) {
    await this.dropdown.scrollIntoViewIfNeeded();
    await this.dropdown.selectOption(option);
  }

  // Text input methods
  async fillTextInput(value) {
    await this.textInputSimple.scrollIntoViewIfNeeded();
    await this.textInputSimple.fill(value);
  }

  // Text transformation methods
  async transformText(text) {
    await this.textInput.scrollIntoViewIfNeeded();
    await this.textInput.fill(text);
    await this.transformBtn.scrollIntoViewIfNeeded();
    await this.transformBtn.click();
  }

  // Delayed action methods
  async triggerDelayedAction() {
    await this.delayBtn.scrollIntoViewIfNeeded();
    await this.delayBtn.click();
  }

  // Tab methods
  async switchToTab(tabName) {
    const tab = this.page.locator(`.tab-btn[data-tab="${tabName}"]`);
    await tab.scrollIntoViewIfNeeded();
    await tab.click();
  }

  // Accordion methods
  async expandAccordionSection(index = 0) {
    const buttons = this.page.locator('.accordion-btn');
    const button = buttons.nth(index);
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }

  // Modal methods
  async openModal() {
    await this.modalOpenBtn.scrollIntoViewIfNeeded();
    await this.modalOpenBtn.click();
  }

  async closeModal() {
    await this.modalClose.click();
  }

  // Progress bar methods
  async startProgress() {
    await this.progressStartBtn.scrollIntoViewIfNeeded();
    await this.progressStartBtn.click();
  }
}

module.exports = MainPage;

