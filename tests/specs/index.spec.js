const { test, expect } = require('../fixtures/custom-fixtures');

test.describe('Main Page (index.html)', () => {
  test('should load the main page and display title', async ({ mainPage }) => {
    await expect(mainPage.page.locator('h1')).toHaveText('Web Elements Tester');
  });

  test('should interact with radio buttons', async ({ mainPage }) => {
    await mainPage.selectRadioOption('option1');
    await expect(mainPage.radioResult).toContainText('Selected: option1');
  });

  test('should interact with checkboxes', async ({ mainPage }) => {
    await mainPage.selectCheckboxes('item1', 'item2');
    await expect(mainPage.checkboxResult).toContainText('Selected: item1, item2');
  });

  test('should interact with dropdown selector', async ({ mainPage }) => {
    await mainPage.selectDropdownOption('option2');
    await expect(mainPage.dropdownResult).toContainText('Selected: option2');
  });

  test('should handle text input', async ({ mainPage }) => {
    await mainPage.fillTextInput('Test Input');
    await expect(mainPage.textInputResult).toContainText('Input: Test Input');
  });

  test('should handle text transformation', async ({ mainPage }) => {
    await mainPage.transformText('ABC');
    
    await expect(mainPage.originalText).toHaveText('ABC');
    await expect(mainPage.hexText).toContainText('41 42 43');
  });

  test('should handle delayed action', async ({ mainPage }) => {
    // Trigger the delayed action
    await mainPage.triggerDelayedAction();
    
    // Wait for status to update to "Waiting..." (with countdown)
    // The status updates immediately but might take a moment to render
    await expect(mainPage.delayStatus).toContainText('Waiting', { timeout: 3000 });
    
    // Wait for the result to appear (after 5 seconds)
    // Give extra time for the result to be displayed
    await expect(mainPage.delayResult).toContainText('Result displayed at', { timeout: 8000 });
    
    // Check for "Complete!" status - this appears right after the result
    // But it only lasts 1 second before resetting, so check quickly
    await expect(mainPage.delayResult).toContainText('delay has completed successfully', { timeout: 1000 });
  });

  test('should interact with tabs', async ({ mainPage }) => {
    await mainPage.switchToTab('tab2');
    await expect(mainPage.tab2Content).toHaveClass(/active/);
    await expect(mainPage.tab2Content).toContainText('Content for Tab 2');
  });

  test('should interact with accordion', async ({ mainPage }) => {
    await expect(mainPage.accordionContent).not.toHaveClass(/active/);
    await mainPage.expandAccordionSection(0);
    await expect(mainPage.accordionContent).toHaveClass(/active/);
  });

  test('should open and close modal', async ({ mainPage }) => {
    await mainPage.openModal();
    await expect(mainPage.modal).toHaveClass(/active/);
    
    await mainPage.closeModal();
    await expect(mainPage.modal).not.toHaveClass(/active/);
  });

  test('should handle progress bar', async ({ mainPage }) => {
    await mainPage.startProgress();
    await expect(mainPage.progressStatus).toContainText('In progress...');
    
    await expect(mainPage.progressStatus).toContainText('Complete!', { timeout: 6000 });
    
    const width = await mainPage.progressBar.evaluate(el => el.style.width);
    expect(width).toBe('100%');
  });
});

