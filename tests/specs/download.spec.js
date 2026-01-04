const { test, expect } = require('../fixtures/custom-fixtures');
const fs = require('fs');

test.describe('Download Page', () => {
  test('should load download page and display title', async ({ downloadPage }) => {
    await expect(downloadPage.page.locator('h1')).toHaveText('Download');
  });

  test('should download a file when clicking download button', async ({ downloadPage }) => {
    const download = await downloadPage.downloadFile();
    
    expect(download.suggestedFilename()).toMatch(/^test-file-.*\.txt$/);
    
    const filePath = await download.path();
    expect(filePath).toBeTruthy();
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    expect(fileContent).toContain('Web Elements Tester - Download File');
    expect(fileContent).toContain('Filename:');
    expect(fileContent).toContain('Checksum:');
  });

  test('should update download status after download', async ({ downloadPage }) => {
    const download = await downloadPage.downloadFile();
    await download.path();
    
    await expect(downloadPage.downloadStatus).toContainText('Downloaded:');
  });

  test('should show download history', async ({ downloadPage }) => {
    const download = await downloadPage.downloadFile();
    await download.path();
    
    await expect(downloadPage.downloadHistory).not.toContainText('No downloads yet');
  });
});

