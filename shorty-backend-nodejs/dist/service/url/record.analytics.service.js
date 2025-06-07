"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordClickAnalytics = void 0;
const global_mapper_1 = require("../../api/v1/core/mapper/global.mapper");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const geoip_lite_1 = __importDefault(require("geoip-lite"));
const ua_parser_js_1 = require("ua-parser-js");
const recordClickAnalytics = async ({ userId, urlId, ip, userAgent, }) => {
    try {
        console.log("Click recording...");
        let geo = null;
        let country = "UNKNOWN";
        let city = undefined;
        if (ip) {
            geo = geoip_lite_1.default.lookup(ip);
            country = geo?.country || "UNKNOWN";
            city = geo?.city || undefined;
        }
        const parser = new ua_parser_js_1.UAParser(userAgent);
        const osName = parser.getOS().name || "";
        const browserName = parser.getBrowser().name || "";
        const deviceTypeRaw = parser.getDevice().type;
        const deviceType = deviceTypeRaw === "mobile" ? global_mapper_1.analyticDeviceTypeMap["mobile"] : global_mapper_1.analyticDeviceTypeMap["desktop"];
        const operatingSystem = mapOS(osName);
        const browser = mapBrowser(browserName);
        await prisma_1.prisma.userClicks.create({
            data: {
                ip,
                country,
                city,
                deviceType,
                operatingSystem,
                browser,
                urlId,
                userId,
            },
        });
        console.log("Click recorded...");
    }
    catch (error) {
        console.error("Failed to record analytics:", error);
    }
};
exports.recordClickAnalytics = recordClickAnalytics;
function mapOS(os) {
    switch (os.toLowerCase()) {
        case "mac os":
        case "macos":
        case "darwin":
            return global_mapper_1.operatingSystemMap["mac_od"];
        case "windows":
            return global_mapper_1.operatingSystemMap["window"];
        default:
            return global_mapper_1.operatingSystemMap["other"];
    }
}
function mapBrowser(browser) {
    switch (browser.toLowerCase()) {
        case "chrome":
            return global_mapper_1.browserMap['chrome'];
        case "firefox":
            return global_mapper_1.browserMap['firefox'];
        case "safari":
            return global_mapper_1.browserMap['safari'];
        case "edge":
            return global_mapper_1.browserMap['edge'];
        case "opera":
            return global_mapper_1.browserMap['opera'];
        default:
            return global_mapper_1.browserMap['other'];
    }
}
