# Playwright Testing

This directory contains Playwright tests for the Web Elements Tester website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests in headed mode (see browser):
```bash
npm run test:headed
```

Run tests with UI mode:
```bash
npm run test:ui
```

## Test Coverage

The tests cover:
- Static elements (text, images)
- Dynamic elements (date/time, images)
- Form controls (radio buttons, checkboxes, dropdowns, inputs)
- Interactive components (tabs, accordion, modal)
- Actions (delayed action, text transformation, progress bar)
- Navigation (hamburger menu)

## Test URL

Tests run against: https://jesuschua.github.io/web-elements-tester/

