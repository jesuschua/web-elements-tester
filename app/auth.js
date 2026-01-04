// Authentication module
// Client-side authentication using sessionStorage

// Credentials (visible in source code - this is client-side only)
const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'password';

// Check if user is authenticated
function isAuthenticated() {
    return sessionStorage.getItem('authenticated') === 'true';
}

// Check authentication and redirect if not authenticated
function checkAuth() {
    if (!isAuthenticated()) {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        // Don't redirect if already on login page
        if (currentPage !== 'login.html') {
            window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
        }
    }
}

// Login function
function login(username, password) {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        sessionStorage.setItem('authenticated', 'true');
        return true;
    }
    return false;
}

// Logout function
function logout() {
    sessionStorage.removeItem('authenticated');
    window.location.href = 'login.html';
}

// Get redirect URL from query parameters
function getRedirectUrl() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    return redirect || 'index.html';
}

