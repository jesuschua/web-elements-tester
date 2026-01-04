module.exports = {
  baseURL: process.env.BASE_URL || 'https://jesuschua.github.io/web-elements-tester',
  timeout: 30000,
  retries: 2,
  pages: {
    main: '/app/',
    navigation: '/app/navigation.html',
    formValidation: '/app/form-validation.html',
    dataDisplay: '/app/data-display.html',
    keyboardEvents: '/app/keyboard-events.html',
    download: '/app/download.html',
    printing: '/app/printing.html',
    login: '/app/login.html'
  }
};

