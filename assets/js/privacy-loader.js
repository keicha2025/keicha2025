/**
 * KEICHA 隱私權條款 - 自動載入引擎 (重構修正版)
 */
window.addEventListener('load', () => {
    // ★ 修正為根目錄路徑
    const privacy_tsv_url = "./assets/data/privacy.tsv";
    
    const container = document.getElementById('privacy-container');
    const loader = document.getElementById('privacy-loader');

    function fetchWithCacheBust(url) {
        const cacheBustUrl = url + '?v=' + new Date().getTime();
        return fetch(cacheBustUrl, { cache: 'no-store' }).then(res => {
            if (!res.ok) throw new Error(`檔案讀取失敗 (${res.status})`);
            return res.text();
        });
    }

    function parseTSV(text) {
        const lines = text.split(/\r?\n/);
        if (lines.length < 2) return [];
        let headers = lines[0].split('\t').map(h => h.trim().replace(/[\uFEFF"']/g, ''));
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            const row = lines[i].split('\t');
            const item = {};
            headers.forEach((key, index) => {
                let val = row[index] ? row[index].trim() : '';
                if (val.startsWith('"') && val.endsWith('"')) { val = val.slice(1, -1); }
                val = val.replace(/""/g, '"'); 
                item[key] = val;
            });
            data.push(item);
        }
        return data;
    }

    function renderPrivacy(items) {
        if (!container) return;
        if (loader) loader.style.display = 'none';
        container.innerHTML = '';
        items.sort((a, b) => parseInt(a.sort || 0) - parseInt(b.sort || 0));
        items.forEach(item => {
            if (!item.title && !item.content) return;
            const section = document.createElement('section');
            if (item.title) {
                const h3 = document.createElement('h3');
                h3.textContent = item.title;
                section.appendChild(h3);
            }
            if (item.content) {
                const contentDiv = document.createElement('div');
                let htmlContent = item.content.replace(/\n/g, '<br>');
                contentDiv.innerHTML = htmlContent;
                section.appendChild(contentDiv);
            }
            container.appendChild(section);
        });
    }

    if (container) {
        fetchWithCacheBust(privacy_tsv_url)
            .then(text => parseTSV(text))
            .then(data => renderPrivacy(data))
            .catch(err => {
                console.error(err);
                if (loader) loader.style.display = 'none';
                container.innerHTML = `<p class="text-red-600 text-center">載入條款失敗。</p>`;
            });
    }
});
