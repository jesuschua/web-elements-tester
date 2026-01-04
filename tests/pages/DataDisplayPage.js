const config = require('../config/test-config');

class DataDisplayPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search-input');
    this.filterId = page.locator('#filter-id');
    this.filterName = page.locator('#filter-name');
    this.filterEmail = page.locator('#filter-email');
    this.filterStatus = page.locator('#filter-status');
    this.clearFiltersBtn = page.locator('#clear-filters-btn');
    this.tableBody = page.locator('#table-body');
    this.prevBtn = page.locator('#prev-btn');
    this.nextBtn = page.locator('#next-btn');
    this.pageInfo = page.locator('#page-info');
    this.paginationInfo = page.locator('#pagination-info');
    this.filterResultsInfo = page.locator('#filter-results-info');
  }

  async goto() {
    await this.page.goto(`${config.baseURL}${config.pages.dataDisplay}`);
  }

  async getTitle() {
    return this.page.locator('h1');
  }

  async search(query) {
    await this.searchInput.scrollIntoViewIfNeeded();
    await this.searchInput.fill(query);
  }

  async filterByStatus(status) {
    await this.filterStatus.scrollIntoViewIfNeeded();
    await this.filterStatus.selectOption(status);
  }

  async filterById(id) {
    await this.filterId.scrollIntoViewIfNeeded();
    await this.filterId.fill(id.toString());
  }

  async filterByName(name) {
    await this.filterName.scrollIntoViewIfNeeded();
    await this.filterName.fill(name);
  }

  async filterByEmail(email) {
    await this.filterEmail.scrollIntoViewIfNeeded();
    await this.filterEmail.fill(email);
  }

  async clearFilters() {
    await this.clearFiltersBtn.scrollIntoViewIfNeeded();
    await this.clearFiltersBtn.click();
  }

  async goToNextPage() {
    await this.nextBtn.scrollIntoViewIfNeeded();
    await this.nextBtn.click();
  }

  async goToPreviousPage() {
    await this.prevBtn.scrollIntoViewIfNeeded();
    await this.prevBtn.click();
  }

  async getTableRows() {
    return this.tableBody.locator('tr');
  }
}

module.exports = DataDisplayPage;

