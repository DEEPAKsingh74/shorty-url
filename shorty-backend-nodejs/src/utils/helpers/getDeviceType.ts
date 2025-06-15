import { analyticDeviceTypeMap } from "@/api/v1/core/mapper/global.mapper";
import { AnalyticDeviceType } from "@prisma/client";
import { UAParser } from "ua-parser-js";

export type DeviceType = 'mobile' | 'desktop';

export const getDeviceType = (userAgent?: string): DeviceType => {

    const parser = new UAParser(userAgent);
    const deviceTypeRaw = parser.getDevice().type;

    const deviceType: AnalyticDeviceType =
        deviceTypeRaw === "mobile" ? analyticDeviceTypeMap["mobile"] : analyticDeviceTypeMap["desktop"];

    return deviceType
};