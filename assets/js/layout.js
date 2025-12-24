function renderLayout() {
    const config = KEICHA_CONFIG;
    
    // --- Header 渲染 ---
    const headerHtml = `
    <header class="bg-white shadow-md sticky top-0 z-50 h-20">
        <div class="container-custom h-full flex justify-between items-center">
            <a href="./index.html" class="flex items-center">
                <img src="${config.images.logo}" alt="Logo" class="h-14">
            </a>
            <!-- 電腦版導覽 -->
            <nav class="hidden md:flex items-center space-x-4">
                ${config.navLinks.map(link => `
                    <a href="${link.url}" class="px-3 py-2 text-base font-medium text-gray-700 hover:text-brandGreen">${link.title}</a>
                `).join('')}
                <a href="${config.lineLink}" target="_blank" class="bg-brandGreen text-white px-5 py-2 rounded-full font-medium shadow-md">LINE客服</a>
            </nav>
            <!-- 手機版按鈕 -->
            <button id="mobile-menu-btn" class="md:hidden text-brandGreen">
                <span class="material-symbols-rounded text-3xl">menu</span>
            </button>
        </div>
        <!-- 手機版選單容器 -->
        <div id="mobile-menu" class="hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 p-4">
             ${config.navLinks.map(link => `<a href="${link.url}" class="block py-3 px-4 text-gray-700 border-b border-gray-50">${link.title}</a>`).join('')}
             <a href="${config.lineLink}" target="_blank" class="block mt-4 text-center bg-brandGreen text-white py-3 rounded-lg">LINE官方客服</a>
        </div>
    </header>`;

    // --- Footer 渲染 ---
    const footerHtml = `
    <footer class="bg-gray-800 text-gray-300 py-16">
        <div class="container-custom grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
                <h4 class="text-lg font-semibold text-white mb-4">服務項目</h4>
                <ul class="space-y-3">
                    ${config.navLinks.map(link => `<li><a href="${link.url}" class="text-gray-400 hover:text-white underline-offset-4 hover:underline">${link.title}</a></li>`).join('')}
                </ul>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-white mb-4">付款方式</h4>
                <ul class="space-y-3">
                    <li><a href="${config.paymentLink}" target="_blank" class="text-gray-400 hover:text-white">線上刷卡</a></li>
                    <li><a href="./diy.html" class="text-gray-400 hover:text-white">貨到付款下單</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-white mb-4">購買須知</h4>
                <p class="text-sm text-gray-400 leading-relaxed">預購商品下單後約15~20天內出貨。不適用猶豫期，恕不接受取消或退貨。</p>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-white mb-4">客服聯絡</h4>
                <img src="${config.images.qrCode}" class="w-24 h-24 rounded-lg mb-3">
                <p class="text-sm">LINE ID: ${config.lineId}</p>
            </div>
        </div>
        <div class="text-center text-gray-500 mt-12 pt-8 border-t border-gray-700 text-sm">© 2025 KEICHA. All Rights Reserved.</div>
    </footer>`;

    const h = document.getElementById('header-wrapper');
    const f = document.getElementById('footer-wrapper');
    if (h) h.innerHTML = headerHtml;
    if (f) f.innerHTML = footerHtml;

    // 手機選單開關邏輯
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.onclick = () => menu.classList.toggle('hidden');
    }
}

document.addEventListener('DOMContentLoaded', renderLayout);
