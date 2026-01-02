// Hamburger menu functionality
const hamburgerBtn = document.getElementById('hamburger-btn');
const menuNav = document.getElementById('menu-nav');

if (hamburgerBtn && menuNav) {
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

