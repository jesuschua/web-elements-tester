const { test, expect } = require('@playwright/test');

test.describe('Printing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jesuschua.github.io/web-elements-tester/printing.html');
  });

  test('should load printing page and display title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Printing');
  });

  test('should have print button', async ({ page }) => {
    const printBtn = page.locator('button:has-text("Print This Page")');
    await expect(printBtn).toBeVisible();
  });

  test('should have print-friendly content section', async ({ page }) => {
    await expect(page.locator('.print-section')).toBeVisible();
    await expect(page.locator('.print-content')).toBeVisible();
  });

  test('should have non-printable section', async ({ page }) => {
    await expect(page.locator('.no-print')).toBeVisible();
  });
});

