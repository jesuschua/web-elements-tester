const { test, expect } = require('@playwright/test');

test.describe('Data Display Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jesuschua.github.io/web-elements-tester/data-display.html');
  });

  test('should load data display page and display title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Data Display');
  });

  test('should display data table with rows', async ({ page }) => {
    const tableBody = page.locator('#table-body');
    await expect(tableBody.locator('tr').first()).toBeVisible();
  });

  test('should filter data by search', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    await searchInput.fill('John');
    
    await expect(page.locator('#table-body')).toContainText('John');
  });

  test('should filter data by status', async ({ page }) => {
    const statusFilter = page.locator('#filter-status');
    await statusFilter.selectOption('Active');
    
    const rows = page.locator('#table-body tr');
    const firstRow = rows.first();
    await expect(firstRow).toContainText('Active');
  });

  test('should paginate through data', async ({ page }) => {
    const nextBtn = page.locator('#next-btn');
    const pageInfo = page.locator('#page-info');
    
    await expect(pageInfo).toContainText('Page 1');
    await nextBtn.click();
    await expect(pageInfo).toContainText('Page 2');
  });

  test('should clear filters', async ({ page }) => {
    const searchInput = page.locator('#search-input');
    const clearBtn = page.locator('#clear-filters-btn');
    
    await searchInput.fill('test');
    await clearBtn.click();
    
    await expect(searchInput).toHaveValue('');
  });
});

