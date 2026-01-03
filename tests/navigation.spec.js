const { test, expect } = require('@playwright/test');

test.describe('Navigation Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jesuschua.github.io/web-elements-tester/navigation.html');
  });

  test('should load navigation page and display title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Navigation Page');
  });

  test('should have navigation buttons', async ({ page }) => {
    await expect(page.locator('text=Go to Main Page')).toBeVisible();
    await expect(page.locator('text=Refresh Navigation Page')).toBeVisible();
    await expect(page.locator('text=Open Navigation Page in New Tab')).toBeVisible();
  });

  test('should navigate to main page when clicking button', async ({ page }) => {
    await page.locator('text=Go to Main Page').click();
    await expect(page).toHaveURL(/.*index\.html/);
    await expect(page.locator('h1')).toHaveText('Web Elements Tester');
  });
});

