const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test.describe('Download Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jesuschua.github.io/web-elements-tester/download.html');
  });

  test('should load download page and display title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Download');
  });

  test('should download a file when clicking download button', async ({ page, context }) => {
    const downloadBtn = page.locator('#download-btn');
    
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadBtn.click()
    ]);
    
    expect(download.suggestedFilename()).toMatch(/^test-file-.*\.txt$/);
    
    const filePath = await download.path();
    expect(filePath).toBeTruthy();
    
    // Verify file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    expect(fileContent).toContain('Web Elements Tester - Download File');
    expect(fileContent).toContain('Filename:');
    expect(fileContent).toContain('Checksum:');
  });

  test('should update download status after download', async ({ page }) => {
    const downloadBtn = page.locator('#download-btn');
    const downloadStatus = page.locator('#download-status');
    
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadBtn.click()
    ]);
    
    await download.path(); // Wait for download to complete
    
    await expect(downloadStatus).toContainText('Downloaded:');
  });

  test('should show download history', async ({ page }) => {
    const downloadBtn = page.locator('#download-btn');
    
    // Trigger a download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      downloadBtn.click()
    ]);
    await download.path();
    
    // Check history is updated
    const history = page.locator('#download-history');
    await expect(history).not.toContainText('No downloads yet');
  });
});

