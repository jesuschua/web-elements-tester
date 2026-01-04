const { test, expect } = require('../fixtures/custom-fixtures');
const fs = require('fs');

test.describe('Download Page', () => {
  test('should load download page and display title', async ({ downloadPage }) => {
    await expect(downloadPage.page.locator('h1')).toHaveText('Download');
  });

  test('should download a file when clicking download button', async ({ downloadPage }) => {
    const download = await downloadPage.downloadFile();
    
    expect(download.suggestedFilename()).toMatch(/^test-file-.*\.txt$/);
    
    // Only call path() when we actually need to read the file
    // Use saveAs() as fallback if path() is not available
    let filePath;
    try {
      filePath = await download.path();
    } catch (error) {
      // If path() is not available (e.g., remote connection), use saveAs()
      const path = require('path');
      const os = require('os');
      filePath = path.join(os.tmpdir(), download.suggestedFilename());
      await download.saveAs(filePath);
    }
    
    expect(filePath).toBeTruthy();
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    expect(fileContent).toContain('Web Elements Tester - Download File');
    expect(fileContent).toContain('Filename:');
    expect(fileContent).toContain('Checksum:');
  });

  test('should update download status after download', async ({ downloadPage }) => {
    const download = await downloadPage.downloadFile();
    
    // Wait for download to complete (just wait for the event, don't need path)
    // The UI updates synchronously after the click, but we wait a bit to ensure it's rendered
    await downloadPage.page.waitForTimeout(100);
    await expect(downloadPage.downloadStatus).toContainText('Downloaded:', { timeout: 2000 });
  });

  test('should show download history', async ({ downloadPage }) => {
    const download = await downloadPage.downloadFile();
    
    // Wait for history to update (it updates synchronously after click)
    // The UI updates synchronously after the click, but we wait a bit to ensure it's rendered
    await downloadPage.page.waitForTimeout(100);
    await expect(downloadPage.downloadHistory).not.toContainText('No downloads yet', { timeout: 2000 });
  });
});

