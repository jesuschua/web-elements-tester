const { test, expect } = require('../fixtures/custom-fixtures');
const { assertTableHasRows } = require('../utils/assertions');

test.describe('Data Display Page', () => {
  test('should load data display page and display title', async ({ dataDisplayPage }) => {
    await expect(dataDisplayPage.page.locator('h1')).toHaveText('Data Display');
  });

  test('should display data table with rows', async ({ dataDisplayPage }) => {
    await assertTableHasRows(dataDisplayPage.page, 1);
  });

  test('should filter data by search', async ({ dataDisplayPage }) => {
    await dataDisplayPage.search('John');
    await expect(dataDisplayPage.tableBody).toContainText('John');
  });

  test('should filter data by status', async ({ dataDisplayPage }) => {
    await dataDisplayPage.filterByStatus('Active');
    
    // Wait for filter to apply - wait for filter results info to update
    await dataDisplayPage.page.waitForFunction(
      () => {
        const info = document.getElementById('filter-results-info');
        return info && info.textContent.includes('Filtered');
      },
      { timeout: 2000 }
    );
    
    // Check that the table body contains "Active" and no "Inactive" rows
    await expect(dataDisplayPage.tableBody).toContainText('Active');
    await expect(dataDisplayPage.tableBody).not.toContainText('Inactive');
  });

  test('should paginate through data', async ({ dataDisplayPage }) => {
    await expect(dataDisplayPage.pageInfo).toContainText('Page 1');
    await dataDisplayPage.goToNextPage();
    await expect(dataDisplayPage.pageInfo).toContainText('Page 2');
  });

  test('should clear filters', async ({ dataDisplayPage }) => {
    await dataDisplayPage.search('test');
    await dataDisplayPage.clearFilters();
    
    await expect(dataDisplayPage.searchInput).toHaveValue('');
  });
});

