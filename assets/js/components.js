// assets/js/components.js
async function loadComponents() {
    const components = [
        { id: 'header-placeholder', file: './components/header.html' },
        { id: 'footer-placeholder', file: './components/footer.html' },
        { id: 'contact-placeholder', file: './components/contact-section.html' }
    ];

    for (const comp of components) {
        const target = document.getElementById(comp.id);
        if (target) {
            const res = await fetch(comp.file);
            target.innerHTML = await res.text();
        }
    }

    // 初始化選單邏輯 (原本首頁的 Script)
    initMenu();
}

function initMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.onclick = (e) => {
            e.stopPropagation();
            const state = mobileMenu.getAttribute('data-state') === 'closed' ? 'open' : 'closed';
            mobileMenu.setAttribute('data-state', state);
        };
    }
}

loadComponents();
