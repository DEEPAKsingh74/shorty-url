import { DeviceTypeEnum, ExpiryTypeEnum, TimeUnitEnum } from "./urlshortener";

export type ShortUrlData = {
    device_type: DeviceTypeEnum,
    url: string,
    restricted_countries: string[];
    expire_data: {
        type: ExpiryTypeEnum | null,
        unit: TimeUnitEnum | null,
        value: number
    },
    analytics: boolean
}

export type ShortUrlResponse = {
    success: boolean;
    message: string;
    // @ts-ignore
    data: any
}


