const { test, expect } = require('@playwright/test');

test.describe('Form Validation Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jesuschua.github.io/web-elements-tester/form-validation.html');
  });

  test('should load form validation page and display title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Form Validation');
  });

  test('should show error for empty required fields', async ({ page }) => {
    // Wait for page and scripts to load
    await page.waitForLoadState('networkidle');
    
    // Trigger form submission
    await page.evaluate(() => {
      const form = document.getElementById('required-form');
      const event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
    });
    
    // Wait for validation to run
    await page.waitForTimeout(300);
    await expect(page.locator('#required-name-error')).toContainText('Name is required');
    await expect(page.locator('#required-email-error')).toContainText('Email is required');
  });

  test('should validate email format', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const nameInput = page.locator('#required-name');
    const emailInput = page.locator('#required-email');
    
    await nameInput.fill('Test User');
    await emailInput.fill('invalid-email');
    
    // Trigger form submission
    await page.evaluate(() => {
      const form = document.getElementById('required-form');
      const event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
    });
    
    await page.waitForTimeout(300);
    await expect(page.locator('#required-email-error')).toContainText('Please enter a valid email address');
  });

  test('should accept valid required form', async ({ page }) => {
    const nameInput = page.locator('#required-name');
    const emailInput = page.locator('#required-email');
    const submitBtn = page.locator('#required-form button[type="submit"]');
    
    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await submitBtn.click();
    
    await expect(page.locator('#required-form-result')).toContainText('submitted successfully');
  });

  test('should validate password length', async ({ page }) => {
    const passwordInput = page.locator('#custom-password');
    const validateBtn = page.locator('#custom-form button[type="submit"]');
    
    await passwordInput.fill('short');
    await validateBtn.click();
    
    await expect(page.locator('#custom-password-error')).toContainText('at least 8 characters');
  });

  test('should validate age range', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    const ageInput = page.locator('#custom-age');
    await ageInput.fill('15');
    
    // Trigger form submission
    await page.evaluate(() => {
      const form = document.getElementById('custom-form');
      const event = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(event);
    });
    
    await page.waitForTimeout(300);
    await expect(page.locator('#custom-age-error')).toContainText('Age must be between 18 and 100');
  });

  test('should provide real-time validation feedback', async ({ page }) => {
    const usernameInput = page.locator('#realtime-input');
    
    await usernameInput.fill('ab');
    await expect(page.locator('#realtime-error')).toContainText('at least 3 characters');
    
    await usernameInput.fill('validusername123');
    await expect(page.locator('#realtime-success')).toContainText('valid');
  });
});

