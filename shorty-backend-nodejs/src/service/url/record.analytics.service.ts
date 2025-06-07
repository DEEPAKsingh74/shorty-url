import { analyticDeviceTypeMap, browserMap, operatingSystemMap } from "@/api/v1/core/mapper/global.mapper";
import { AnalyticDeviceType, BrowserEnum, OperatingSystemEnum } from "@prisma/client";
import { prisma } from "@/infrastructure/prisma/prisma";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";


export type RecordClickAnalytics = {
    userId?: string;
    urlId: string;
    ip?: string;
    userAgent?: string;
};

export const recordClickAnalytics = async ({
    userId,
    urlId,
    ip,
    userAgent,
}: RecordClickAnalytics): Promise<void> => {
    try {

        console.log("Click recording...");

        let geo: geoip.Lookup | null = null;
        let country: string | "UNKNOWN" = "UNKNOWN";
        let city: string | undefined = undefined;
        if (ip) {
            geo = geoip.lookup(ip);
            country = geo?.country || "UNKNOWN";
            city = geo?.city || undefined;
        }
        const parser = new UAParser(userAgent);
        const osName = parser.getOS().name || "";
        const browserName = parser.getBrowser().name || "";
        const deviceTypeRaw = parser.getDevice().type;

        const deviceType: AnalyticDeviceType =
            deviceTypeRaw === "mobile" ? analyticDeviceTypeMap["mobile"] : analyticDeviceTypeMap["desktop"];

        const operatingSystem: OperatingSystemEnum = mapOS(osName);
        const browser: BrowserEnum = mapBrowser(browserName);

        await prisma.userClicks.create({
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
        
        
    } catch (error) {
        console.error("Failed to record analytics:", error);
    }
};


function mapOS(os: string): OperatingSystemEnum {
    switch (os.toLowerCase()) {
        case "mac os":
        case "macos":
        case "darwin":
            return operatingSystemMap["mac_od"];
        case "windows":
            return operatingSystemMap["window"];
        default:
            return operatingSystemMap["other"];
    }
}

function mapBrowser(browser: string): BrowserEnum {
    switch (browser.toLowerCase()) {
        case "chrome":
            return browserMap['chrome'];
        case "firefox":
            return browserMap['firefox'];
        case "safari":
            return browserMap['safari'];
        case "edge":
            return browserMap['edge'];
        case "opera":
            return browserMap['opera'];
        default:
            return browserMap['other'];
    }
}
