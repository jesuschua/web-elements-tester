/**
 * Helper functions for form interactions
 */

async function submitForm(page, formId) {
  await page.waitForLoadState('networkidle');
  await page.evaluate((id) => {
    const form = document.getElementById(id);
    const event = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(event);
  }, formId);
  await page.waitForTimeout(300);
}

async function fillFormField(page, fieldId, value) {
  const field = page.locator(`#${fieldId}`);
  await field.fill(value);
}

async function selectDropdownOption(page, dropdownId, optionValue) {
  const dropdown = page.locator(`#${dropdownId}`);
  await dropdown.selectOption(optionValue);
}

module.exports = {
  submitForm,
  fillFormField,
  selectDropdownOption
};

