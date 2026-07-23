function mobileMenu() {
    const btn = document.querySelector('.hamburger-btn');
    const nav = document.getElementById('main-nav');

    if (!btn || !nav) return;

    // Toggle menu open/closed
    btn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        btn.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when any nav link is clicked (great for SPA-style pages)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-open');
            btn.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside the header
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header')) {
            nav.classList.remove('nav-open');
            btn.setAttribute('aria-expanded', 'false');
        }
    });
}

mobileMenu();