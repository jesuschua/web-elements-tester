const { test, expect } = require('../fixtures/custom-fixtures');

test.describe('Printing Page', () => {
  test('should load printing page and display title', async ({ printingPage }) => {
    await expect(printingPage.page.locator('h1')).toHaveText('Printing');
  });

  test('should have print button', async ({ printingPage }) => {
    await expect(printingPage.printBtn).toBeVisible();
  });

  test('should have print-friendly content section', async ({ printingPage }) => {
    await expect(printingPage.printSection).toBeVisible();
    await expect(printingPage.printContent).toBeVisible();
  });

  test('should have non-printable section', async ({ printingPage }) => {
    await expect(printingPage.noPrintSection).toBeVisible();
  });
});

