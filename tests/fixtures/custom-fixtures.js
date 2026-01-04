const { test: baseTest } = require('@playwright/test');
const path = require('path');
const { setAuthenticated } = require('../utils/auth-helpers');

const MainPage = require(path.join(__dirname, '../pages/MainPage'));
const NavigationPage = require(path.join(__dirname, '../pages/NavigationPage'));
const FormValidationPage = require(path.join(__dirname, '../pages/FormValidationPage'));
const DataDisplayPage = require(path.join(__dirname, '../pages/DataDisplayPage'));
const KeyboardEventsPage = require(path.join(__dirname, '../pages/KeyboardEventsPage'));
const DownloadPage = require(path.join(__dirname, '../pages/DownloadPage'));
const PrintingPage = require(path.join(__dirname, '../pages/PrintingPage'));

const test = baseTest.extend({
  mainPage: async ({ page }, use) => {
    await setAuthenticated(page);
    const mainPage = new MainPage(page);
    await mainPage.goto();
    await use(mainPage);
  },

  navigationPage: async ({ page }, use) => {
    await setAuthenticated(page);
    const navPage = new NavigationPage(page);
    await navPage.goto();
    await use(navPage);
  },

  formValidationPage: async ({ page }, use) => {
    await setAuthenticated(page);
    const formPage = new FormValidationPage(page);
    await formPage.goto();
    await use(formPage);
  },

  dataDisplayPage: async ({ page }, use) => {
    await setAuthenticated(page);
    const dataPage = new DataDisplayPage(page);
    await dataPage.goto();
    await use(dataPage);
  },

  keyboardEventsPage: async ({ page }, use) => {
    await setAuthenticated(page);
    const keyboardPage = new KeyboardEventsPage(page);
    await keyboardPage.goto();
    await use(keyboardPage);
  },

  downloadPage: async ({ page }, use) => {
    await setAuthenticated(page);
    const downloadPage = new DownloadPage(page);
    await downloadPage.goto();
    await use(downloadPage);
  },

  printingPage: async ({ page }, use) => {
    await setAuthenticated(page);
    const printingPage = new PrintingPage(page);
    await printingPage.goto();
    await use(printingPage);
  }
});

const { expect } = require('@playwright/test');

module.exports = { test, expect };

