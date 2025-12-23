/**
 * KEICHA 全站統一配置
 */
const SITE_CONFIG = {
    BRAND_NAME: "KEICHA",
    BASE_URL: "", // 搬家到根目錄後設為空

    API: {
        PRODUCT_DISPLAY: "https://script.google.com/macros/s/AKfycbxnxbcdCdxH2Qmuek5Up8BqTWeOLUcLR30jfUi0lMbMn5ocn9tY1f_c7yEyd9KSZ4Um/exec",
        ORDER_SYSTEM: "https://script.google.com/macros/s/AKfycbyUq36i64Z-JGcERE_rZOdphVtVDX8L-lguc7eiUIdoAERqI1ZK8GWAL-HgbC75cuMHFg/exec",
        // ★ 第三組：電話代播系統 API
        DENWA_BOOKING: "https://script.google.com/macros/s/AKfycbyaiaR2hPXA8RN2E1_5GUYFNtzGnkUZC5Kq2xXt6Mw80QVRw0Wi7fBrM2k3MxyZhon4/exec"
    },

    LINE: {
        ID: "@366qwylw",
        LINK: "https://lin.ee/F3JngaC"
    }
};

// 輔助函式：修正搬家後的路徑
function fixUrl(path) {
    if (path.startsWith('http') || path.startsWith('//')) return path;
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    return SITE_CONFIG.BASE_URL + cleanPath;
}
