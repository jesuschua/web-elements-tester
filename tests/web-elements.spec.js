const { test, expect } = require('@playwright/test');

test.describe('Web Elements Tester', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jesuschua.github.io/web-elements-tester/');
  });

  test('should load the main page and display title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Web Elements Tester');
  });

  test('should interact with radio buttons', async ({ page }) => {
    const radio1 = page.locator('input[value="option1"]');
    const radioResult = page.locator('#radio-result');
    
    await radio1.check();
    await expect(radioResult).toContainText('Selected: option1');
  });

  test('should interact with checkboxes', async ({ page }) => {
    const checkbox1 = page.locator('input[name="checkbox"][value="item1"]');
    const checkbox2 = page.locator('input[name="checkbox"][value="item2"]');
    const checkboxResult = page.locator('#checkbox-result');
    
    await checkbox1.check();
    await checkbox2.check();
    await expect(checkboxResult).toContainText('Selected: item1, item2');
  });

  test('should interact with dropdown selector', async ({ page }) => {
    const dropdown = page.locator('#dropdown');
    const dropdownResult = page.locator('#dropdown-result');
    
    await dropdown.selectOption('option2');
    await expect(dropdownResult).toContainText('Selected: option2');
  });

  test('should handle text input', async ({ page }) => {
    const textInput = page.locator('#text-input-simple');
    const textResult = page.locator('#text-input-result');
    
    await textInput.fill('Test Input');
    await expect(textResult).toContainText('Input: Test Input');
  });

  test('should handle text transformation', async ({ page }) => {
    const textInput = page.locator('#text-input');
    const transformBtn = page.locator('#transform-btn');
    const originalText = page.locator('#original-text');
    const hexText = page.locator('#hex-text');
    
    await textInput.fill('ABC');
    await transformBtn.click();
    
    await expect(originalText).toHaveText('ABC');
    await expect(hexText).toContainText('41 42 43');
  });

  test('should handle delayed action', async ({ page }) => {
    const delayBtn = page.locator('#delay-btn');
    const delayStatus = page.locator('#delay-status');
    const delayResult = page.locator('#delay-result');
    
    await delayBtn.click();
    await expect(delayStatus).toContainText('Waiting...');
    
    // Wait for completion (5 seconds + buffer)
    await expect(delayResult).toContainText('Result displayed at', { timeout: 6000 });
    await expect(delayStatus).toContainText('Complete!');
  });

  test('should interact with tabs', async ({ page }) => {
    const tab2 = page.locator('.tab-btn[data-tab="tab2"]');
    const tab2Content = page.locator('#tab2');
    
    await tab2.click();
    await expect(tab2Content).toHaveClass(/active/);
    await expect(tab2Content).toContainText('Content for Tab 2');
  });

  test('should interact with accordion', async ({ page }) => {
    const accordionBtn = page.locator('.accordion-btn').first();
    const accordionContent = page.locator('.accordion-content').first();
    
    await expect(accordionContent).not.toHaveClass(/active/);
    await accordionBtn.click();
    await expect(accordionContent).toHaveClass(/active/);
  });

  test('should open and close modal', async ({ page }) => {
    const openBtn = page.locator('#modal-open-btn');
    const modal = page.locator('#modal');
    const closeBtn = page.locator('.modal-close');
    
    await openBtn.click();
    await expect(modal).toHaveClass(/active/);
    
    await closeBtn.click();
    await expect(modal).not.toHaveClass(/active/);
  });

  test('should handle progress bar', async ({ page }) => {
    const startBtn = page.locator('#progress-start-btn');
    const progressBar = page.locator('#progress-bar');
    const progressStatus = page.locator('#progress-status');
    
    await startBtn.click();
    await expect(progressStatus).toContainText('In progress...');
    
    // Wait for completion
    await expect(progressStatus).toContainText('Complete!', { timeout: 6000 });
    
    // Check progress bar is filled
    const width = await progressBar.evaluate(el => el.style.width);
    expect(width).toBe('100%');
  });
});
