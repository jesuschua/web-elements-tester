// Navigation menu items - single source of truth
const menuItems = [
    { href: 'index.html', text: 'Main Page' },
    { href: 'navigation.html', text: 'Navigation Page' },
    { href: 'form-validation.html', text: 'Form Validation' },
    { href: 'data-display.html', text: 'Data Display' },
    { href: 'printing.html', text: 'Printing' },
    { href: 'keyboard-events.html', text: 'Keyboard Events' },
    { href: 'download.html', text: 'Download' },
    { href: '#', text: 'Logout', onclick: 'logout(); return false;' }
];

// Generate menu HTML
function generateMenuHTML() {
    return menuItems.map(item => {
        if (item.onclick) {
            return `<a href="${item.href}" onclick="${item.onclick}">${item.text}</a>`;
        }
        return `<a href="${item.href}">${item.text}</a>`;
    }).join('');
}

// Initialize menu on page load
function initializeMenu() {
    const menuNav = document.getElementById('menu-nav');
    if (menuNav) {
        menuNav.innerHTML = generateMenuHTML();
    }
}

// Hamburger menu functionality
const hamburgerBtn = document.getElementById('hamburger-btn');
const menuNav = document.getElementById('menu-nav');

if (hamburgerBtn && menuNav) {
    // Initialize menu HTML
    initializeMenu();
    
    hamburgerBtn.addEventListener('click', function() {
        menuNav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = menuNav.contains(event.target);
        const isClickOnButton = hamburgerBtn.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnButton && menuNav.classList.contains('active')) {
            menuNav.classList.remove('active');
        }
    });
}
