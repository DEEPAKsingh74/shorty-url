"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientIp = void 0;
const getClientIp = (req) => {
    const xForwardedFor = req.headers['x-forwarded-for'];
    let ip;
    if (typeof xForwardedFor === 'string') {
        ip = xForwardedFor.split(',')[0];
    }
    else if (Array.isArray(xForwardedFor)) {
        ip = xForwardedFor[0];
    }
    else {
        ip = req.socket.remoteAddress || req.ip;
    }
    // Normalize IPv6 ::ffff:127.0.0.1 → 127.0.0.1
    if (ip?.startsWith("::ffff:")) {
        ip = ip.substring(7);
    }
    return ip?.trim() || '';
};
exports.getClientIp = getClientIp;
