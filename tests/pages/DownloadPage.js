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
    // Wait for the download button to be ready
    await this.downloadBtn.waitFor({ state: 'visible' });
    await this.downloadBtn.scrollIntoViewIfNeeded();
    
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.downloadBtn.click()
    ]);
    
    // Return the download object - don't call path() here as it may not be available
    // in all Playwright configurations (e.g., remote connections)
    return download;
  }

  async clearHistory() {
    await this.clearHistoryBtn.scrollIntoViewIfNeeded();
    await this.clearHistoryBtn.click();
  }
}

module.exports = DownloadPage;

