const { test, expect } = require('@playwright/test');

test('should load the main page and display title', async ({ page }) => {
  await page.goto('https://jesuschua.github.io/web-elements-tester/');
  await expect(page.locator('h1')).toHaveText('Web Elements Tester');
});
