import geoip from 'geoip-lite';

export const getCountryCodeFromIP = (ip: string): string | null => {
    const geo = geoip.lookup(ip);
    return geo?.country || null;
};
