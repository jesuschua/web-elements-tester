const { expect } = require('@playwright/test');

/**
 * Custom assertion helpers
 */

async function assertTableHasRows(page, minRows) {
  const rows = await page.locator('#table-body tr').count();
  expect(rows).toBeGreaterThanOrEqual(minRows);
}

async function assertFilterWorks(page, filterSelector, filterValue, expectedText) {
  await page.locator(filterSelector).selectOption(filterValue);
  const firstRow = page.locator('#table-body tr').first();
  await expect(firstRow).toContainText(expectedText);
}

async function assertErrorVisible(page, errorId, expectedText) {
  await expect(page.locator(`#${errorId}`)).toContainText(expectedText);
}

async function assertSuccessMessage(page, successId, expectedText) {
  await expect(page.locator(`#${successId}`)).toContainText(expectedText);
}

module.exports = {
  assertTableHasRows,
  assertFilterWorks,
  assertErrorVisible,
  assertSuccessMessage
};

