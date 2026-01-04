/**
 * Authentication helper functions for Playwright tests
 */

const config = require('../config/test-config');

// Default test credentials (must match auth.js)
const TEST_USERNAME = 'admin';
const TEST_PASSWORD = 'password';

/**
 * Login to the application
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function login(page) {
  // Navigate to login page
  await page.goto(`${config.baseURL}${config.pages.login}`);
  
  // Wait for login form to be visible
  await page.waitForSelector('#login-form', { state: 'visible' });
  
  // Fill in credentials
  await page.fill('#username', TEST_USERNAME);
  await page.fill('#password', TEST_PASSWORD);
  
  // Submit form
  await page.click('#login-btn');
  
  // Wait for redirect (either to index or the page we were trying to access)
  await page.waitForLoadState('networkidle');
  
  // Verify we're not on login page anymore
  const currentUrl = page.url();
  if (currentUrl.includes('login.html')) {
    throw new Error('Login failed - still on login page after submission');
  }
}

/**
 * Set authenticated state directly in sessionStorage (faster for tests)
 * @param {import('@playwright/test').Page} page - Playwright page object
 */
async function setAuthenticated(page) {
  await page.addInitScript(() => {
    sessionStorage.setItem('authenticated', 'true');
  });
}

module.exports = {
  login,
  setAuthenticated,
  TEST_USERNAME,
  TEST_PASSWORD
};

