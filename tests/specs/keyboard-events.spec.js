const { test, expect } = require('../fixtures/custom-fixtures');

test.describe('Keyboard Events Page', () => {
  test('should load keyboard events page and display title', async ({ keyboardEventsPage }) => {
    await expect(keyboardEventsPage.page.locator('h1')).toHaveText('Keyboard Events');
  });

  test('should detect key press', async ({ keyboardEventsPage }) => {
    await keyboardEventsPage.pressKey('a');
    
    await expect(keyboardEventsPage.keyName).not.toHaveText('-');
    await expect(keyboardEventsPage.keyCode).not.toHaveText('-');
  });

  test('should detect modifier keys', async ({ keyboardEventsPage }) => {
    await keyboardEventsPage.pressKey('Shift+a');
    
    await expect(keyboardEventsPage.keyShift).toContainText('Yes');
  });

  test('should handle keyboard input field events', async ({ keyboardEventsPage }) => {
    await keyboardEventsPage.typeInInput('t');
    
    await keyboardEventsPage.page.waitForTimeout(200);
    await expect(keyboardEventsPage.inputEvents).not.toContainText('No events yet');
    const eventsText = await keyboardEventsPage.inputEvents.textContent();
    expect(eventsText).toMatch(/Keydown|Keyup|Keypress/);
  });

  test('should handle arrow key counter', async ({ keyboardEventsPage }) => {
    await keyboardEventsPage.clickBody();
    
    await keyboardEventsPage.pressKey('ArrowUp');
    await expect(keyboardEventsPage.arrowCounter).toContainText('Counter: 1');
    
    await keyboardEventsPage.pressKey('ArrowDown');
    await expect(keyboardEventsPage.arrowCounter).toContainText('Counter: 0');
  });
});

