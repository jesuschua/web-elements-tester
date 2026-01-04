const { test, expect } = require('../fixtures/custom-fixtures');
const { assertErrorVisible } = require('../utils/assertions');

test.describe('Form Validation Page', () => {
  test('should load form validation page and display title', async ({ formValidationPage }) => {
    await expect(formValidationPage.page.locator('h1')).toHaveText('Form Validation');
  });

  test('should show error for empty required fields', async ({ formValidationPage }) => {
    await formValidationPage.submitRequiredForm();
    
    await assertErrorVisible(formValidationPage.page, 'required-name-error', 'Name is required');
    await assertErrorVisible(formValidationPage.page, 'required-email-error', 'Email is required');
  });

  test('should validate email format', async ({ formValidationPage }) => {
    await formValidationPage.fillRequiredForm('Test User', 'invalid-email');
    await formValidationPage.submitRequiredForm();
    
    await assertErrorVisible(formValidationPage.page, 'required-email-error', 'Please enter a valid email address');
  });

  test('should accept valid required form', async ({ formValidationPage }) => {
    await formValidationPage.fillRequiredForm('Test User', 'test@example.com');
    await formValidationPage.page.locator('#required-form button[type="submit"]').click();
    
    await expect(formValidationPage.requiredFormResult).toContainText('submitted successfully');
  });

  test('should validate password length', async ({ formValidationPage }) => {
    await formValidationPage.fillCustomForm('short', null, null);
    await formValidationPage.page.locator('#custom-form button[type="submit"]').click();
    
    await assertErrorVisible(formValidationPage.page, 'custom-password-error', 'at least 8 characters');
  });

  test('should validate age range', async ({ formValidationPage }) => {
    await formValidationPage.fillCustomForm(null, 15, null);
    await formValidationPage.submitCustomForm();
    
    await assertErrorVisible(formValidationPage.page, 'custom-age-error', 'Age must be between 18 and 100');
  });

  test('should provide real-time validation feedback', async ({ formValidationPage }) => {
    await formValidationPage.typeRealtimeInput('ab');
    await expect(formValidationPage.realtimeError).toContainText('at least 3 characters');
    
    await formValidationPage.typeRealtimeInput('validusername123');
    await expect(formValidationPage.realtimeSuccess).toContainText('valid');
  });
});

