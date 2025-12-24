// assets/js/components.js
async function loadComponents() {
    // 1. 載入 Header
    const headerRes = await fetch('./components/header.html');
    const headerHtml = await headerRes.text();
    document.getElementById('global-header').innerHTML = headerHtml;

    // 2. 載入 Footer
    const footerRes = await fetch('./components/footer.html');
    const footerHtml = await footerRes.text();
    document.getElementById('global-footer').innerHTML = footerHtml;

    // 3. 注入配置資料 (例如 LINE ID)
    updateDynamicContent();
    
    // 4. 初始化選單功能
    initMenuLogic();
}

function updateDynamicContent() {
    // 自動填入所有標記為 data-config 的元素
    document.querySelectorAll('[data-config="lineId"]').forEach(el => el.innerText = SITE_CONFIG.lineId);
    document.querySelectorAll('[data-config="copyright"]').forEach(el => el.innerText = SITE_CONFIG.footerCopyright);
}

function initMenuLogic() {
    // 這裡放入你原本在 default.html 的 menu 切換邏輯
    const menuBtn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if(menuBtn && menu) {
        menuBtn.onclick = () => {
            const isClosed = menu.getAttribute('data-state') === 'closed';
            menu.setAttribute('data-state', isClosed ? 'open' : 'closed');
        };
    }
}

document.addEventListener('DOMContentLoaded', loadComponents);
