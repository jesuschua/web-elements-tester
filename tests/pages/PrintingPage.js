const config = require('../config/test-config');

class PrintingPage {
  constructor(page) {
    this.page = page;
    this.printBtn = page.locator('button:has-text("Print This Page")');
    this.printSection = page.locator('.print-section');
    this.printContent = page.locator('.print-content');
    this.noPrintSection = page.locator('.no-print');
  }

  async goto() {
    await this.page.goto(`${config.baseURL}${config.pages.printing}`);
  }

  async getTitle() {
    return this.page.locator('h1');
  }
}

module.exports = PrintingPage;

