
export enum ExpireTypeEnum {
    CLICKS = "CLICKS",
    TIME = "TIME"
}

export enum ExpireUnitEnum {
    MONTHS = "MONTHS",
    DAYS = "DAYS",
    HOURS = "HOURS"
}

export enum DeviceTypeEnum {
    BOTH = 'BOTH',
    MOBILE = 'MOBILE',
    DESKTOP = 'DESKTOP'
}

export enum AnalyticDeviceType {
    MOBILE = "mobile",
    DESKTOP = "desktop"
}

export enum OperatingSystemEnum {
    MAC_OS = "mac_os",
    WINDOWS = "windows",
    OTHER = 'other'
}

export enum BrowserEnum {
    CHROME = "chrome",
    FIREFOX = 'firefox',
    SAFARI = 'safari',
    EDGE = 'edge',
    OPERA = 'opera',
    OTHER = 'other'
}

export type UrlCreateData = {
    url: string;
    device_type: DeviceTypeEnum
    restricted_countries?: string[];
    expire: {
        type: ExpireTypeEnum | null;
        unit: ExpireUnitEnum | null;
        value: number;
    } | null;
    user_id?: string;
    is_analytics: boolean
}


export type UrlResponse = {
    id: string
    short_url: string;
    original_url: string;
    device_type: string;
    created_at: string;
    updated_at: string;
    is_expired: boolean;
    expire_type: string | null;
    expire_unit: string | null;
    is_analytics: boolean;
    expire_clicks: number | null;
    expire_at: string | null;
    user_id: string | null;
    restricted_countries: {
        code: string;
        name: string;
    }[];
};

