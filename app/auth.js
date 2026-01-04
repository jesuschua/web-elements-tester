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
        sessionStorage.setItem('username', username);
        return true;
    }
    return false;
}

// Logout function
function logout() {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('username');
    window.location.href = 'login.html';
}

// Get current username
function getCurrentUsername() {
    return sessionStorage.getItem('username') || '';
}

// Display username in header
function displayUsername() {
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay && isAuthenticated()) {
        const username = getCurrentUsername();
        usernameDisplay.textContent = `Logged in as: ${username}`;
        usernameDisplay.style.display = 'block';
    } else if (usernameDisplay) {
        usernameDisplay.style.display = 'none';
    }
}

// Get redirect URL from query parameters
function getRedirectUrl() {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    return redirect || 'index.html';
}

