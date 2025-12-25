/**
 * js/api.js
 * 統一管理 KEICHA 專案的所有 GAS API 連線
 */

const ENDPOINTS = {
    MATCHA: "https://script.google.com/macros/s/AKfycbxnxbcdCdxH2Qmuek5Up8BqTWeOLUcLR30jfUi0lMbMn5ocn9tY1f_c7yEyd9KSZ4Um/exec",
    CORE:   "https://script.google.com/macros/s/AKfycbyUq36i64Z-JGcERE_rZOdphVtVDX8L-lguc7eiUIdoAERqI1ZK8GWAL-HgbC75cuMHFg/exec",
    DENWA:  "https://script.google.com/macros/s/AKfycbyaiaR2hPXA8RN2E1_5GUYFNtzGnkUZC5Kq2xXt6Mw80QVRw0Wi7fBrM2k3MxyZhon4/exec"
};

const API = {
    // --- 通用請求封裝 ---
    async _get(url, params = {}) {
        const query = new URLSearchParams(params).toString();
        const fullUrl = query ? `${url}?${query}` : url;
        try {
            const res = await fetch(fullUrl);
            return await res.json();
        } catch (e) { console.error("GET Error:", e); throw e; }
    },

    async _post(url, payload, isFormData = false) {
        try {
            const options = { method: 'POST' };
            if (isFormData) {
                options.body = payload; // 直接傳送 FormData
            } else {
                options.body = JSON.stringify(payload); // 傳送 JSON 字串
            }
            const res = await fetch(url, options);
            return await res.json();
        } catch (e) { console.error("POST Error:", e); throw e; }
    },

    // --- MATCHA 端點 (抹茶商品) ---
    async fetchMatchaData() {
        return await this._get(ENDPOINTS.MATCHA);
    },

    // --- CORE 端點 (會員/訂單/後台) ---
    async fetchSystemData() {
        return await this._get(ENDPOINTS.CORE);
    },
    async queryOrder(params) {
        return await this._get(ENDPOINTS.CORE, { action: 'query', ...params });
    },
    async login(phone) {
        return await this._post(ENDPOINTS.CORE, { action: 'login', phone });
    },
    async checkout(orderData) {
        return await this._post(ENDPOINTS.CORE, { action: 'checkout', ...orderData });
    },
    async updateFastConfig(configData) {
        return await this._post(ENDPOINTS.CORE, { action: 'updateFastConfig', ...configData });
    },

    // --- DENWA 端點 (電話代播) ---
    async fetchDenwaPlans() {
        return await this._get(ENDPOINTS.DENWA, { action: 'getPlans' });
    },
    async submitDenwaBooking(formData) {
        return await this._post(ENDPOINTS.DENWA, formData, true);
    }
};

window.API = API;
