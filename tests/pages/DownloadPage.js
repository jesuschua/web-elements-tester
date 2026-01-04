const config = require('../config/test-config');

class DownloadPage {
  constructor(page) {
    this.page = page;
    this.downloadBtn = page.locator('#download-btn');
    this.downloadStatus = page.locator('#download-status');
    this.downloadHistory = page.locator('#download-history');
    this.clearHistoryBtn = page.locator('#clear-history-btn');
  }

  async goto() {
    await this.page.goto(`${config.baseURL}${config.pages.download}`);
  }

  async getTitle() {
    return this.page.locator('h1');
  }

  async downloadFile() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadBtn.click()
    ]);
    return download;
  }

  async clearHistory() {
    await this.clearHistoryBtn.click();
  }
}

module.exports = DownloadPage;

