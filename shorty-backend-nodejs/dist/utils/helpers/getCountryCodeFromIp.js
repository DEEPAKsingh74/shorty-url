"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryCodeFromIP = void 0;
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const getCountryCodeFromIP = (ip) => {
    const geo = geoip_lite_1.default.lookup(ip);
    return geo?.country || null;
};
exports.getCountryCodeFromIP = getCountryCodeFromIP;
