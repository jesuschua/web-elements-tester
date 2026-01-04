const config = require('../config/test-config');

class NavigationPage {
  constructor(page) {
    this.page = page;
    this.goToMainPageBtn = page.locator('text=Go to Main Page');
    this.refreshBtn = page.locator('text=Refresh Navigation Page');
    this.openNewTabBtn = page.locator('text=Open Navigation Page in New Tab');
  }

  async goto() {
    await this.page.goto(`${config.baseURL}${config.pages.navigation}`);
  }

  async getTitle() {
    return this.page.locator('h1');
  }

  async navigateToMainPage() {
    await this.goToMainPageBtn.click();
  }
}

module.exports = NavigationPage;

