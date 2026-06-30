const toggle = document.querySelector('.filter-panel__toggle');
const content = document.querySelector('#filter-panel-content');
const icon = document.querySelector('#filter-panel-icon');

toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';

    toggle.setAttribute('aria-expanded', String(!isOpen));
    content.classList.toggle('is-closed', isOpen);
    content.classList.toggle('is-open', !isOpen);
    icon.textContent = isOpen ? '+' : '−';
});
