const { test, expect } = require('@playwright/test');

test.describe('Keyboard Events Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://jesuschua.github.io/web-elements-tester/keyboard-events.html');
  });

  test('should load keyboard events page and display title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Keyboard Events');
  });

  test('should detect key press', async ({ page }) => {
    await page.keyboard.press('a');
    
    await expect(page.locator('#key-name')).not.toHaveText('-');
    await expect(page.locator('#key-code')).not.toHaveText('-');
  });

  test('should detect modifier keys', async ({ page }) => {
    await page.keyboard.press('Shift+a');
    
    await expect(page.locator('#key-shift')).toContainText('Yes');
  });

  test('should handle keyboard input field events', async ({ page }) => {
    const input = page.locator('#keyboard-input');
    await input.click();
    
    // Type a character to trigger keydown event
    await input.type('t');
    
    // Wait for event handlers to fire
    await page.waitForTimeout(200);
    await expect(page.locator('#input-events')).not.toContainText('No events yet');
    const eventsText = await page.locator('#input-events').textContent();
    expect(eventsText).toMatch(/Keydown|Keyup|Keypress/);
  });

  test('should handle arrow key counter', async ({ page }) => {
    // Click on page to ensure focus is not on input
    await page.locator('body').click();
    
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('#arrow-counter')).toContainText('Counter: 1');
    
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#arrow-counter')).toContainText('Counter: 0');
  });
});

