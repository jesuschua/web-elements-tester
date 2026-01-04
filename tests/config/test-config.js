module.exports = {
  baseURL: process.env.BASE_URL || 'https://jesuschua.github.io/web-elements-tester',
  timeout: 30000,
  retries: 2,
  pages: {
    main: '/',
    navigation: '/navigation.html',
    formValidation: '/form-validation.html',
    dataDisplay: '/data-display.html',
    keyboardEvents: '/keyboard-events.html',
    download: '/download.html',
    printing: '/printing.html',
    login: '/login.html'
  }
};

