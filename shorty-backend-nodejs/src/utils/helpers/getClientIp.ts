import { Request } from "express";

export const getClientIp = (req: Request): string => {
    const xForwardedFor = req.headers['x-forwarded-for'];

    let ip: string | undefined;

    if (typeof xForwardedFor === 'string') {
        ip = xForwardedFor.split(',')[0];
    } else if (Array.isArray(xForwardedFor)) {
        ip = xForwardedFor[0];
    } else {
        ip = req.socket.remoteAddress || req.ip;
    }

    // Normalize IPv6 ::ffff:127.0.0.1 → 127.0.0.1
    if (ip?.startsWith("::ffff:")) {
        ip = ip.substring(7);
    }

    return ip?.trim() || '';
};
