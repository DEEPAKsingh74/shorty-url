"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUrlExpired = void 0;
const isUrlExpired = (urlResponse, userCountryCode) => {
    const now = new Date();
    // ✅ 1. Country restriction
    if (userCountryCode) {
        const restricted = urlResponse.restricted_countries.some((country) => country.code.toLowerCase() === userCountryCode.toLowerCase());
        if (restricted) {
            return true;
        }
    }
    // ✅ 2. Time expiration
    if (urlResponse.expire_at) {
        const expireAt = new Date(urlResponse.expire_at);
        if (now > expireAt) {
            return true;
        }
    }
    // ✅ 3. Clicks expiration
    if (urlResponse.expire_clicks !== null &&
        typeof urlResponse.expire_clicks === "number") {
        return 10 >= urlResponse.expire_clicks;
    }
    return false;
};
exports.isUrlExpired = isUrlExpired;
