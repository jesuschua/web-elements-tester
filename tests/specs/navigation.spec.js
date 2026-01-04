const { test, expect } = require('../fixtures/custom-fixtures');

test.describe('Navigation Page', () => {
  test('should load navigation page and display title', async ({ navigationPage }) => {
    await expect(navigationPage.page.locator('h1')).toHaveText('Navigation Page');
  });

  test('should have navigation buttons', async ({ navigationPage }) => {
    await expect(navigationPage.goToMainPageBtn).toBeVisible();
    await expect(navigationPage.refreshBtn).toBeVisible();
    await expect(navigationPage.openNewTabBtn).toBeVisible();
  });

  test('should navigate to main page when clicking button', async ({ navigationPage }) => {
    await navigationPage.navigateToMainPage();
    await expect(navigationPage.page).toHaveURL(/.*index\.html/);
    await expect(navigationPage.page.locator('h1')).toHaveText('Web Elements Tester');
  });
});

