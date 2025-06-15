import { UrlResponse } from "@/types/url";
import { getClickCount } from "../analytics/get_click_count.service";

export const isUrlExpired = async (urlResponse: UrlResponse, userCountryCode: string | null, myDeviceType: String | null): Promise<boolean> => {
    const now = new Date();

    // ✅ 1. Country restriction
    if (userCountryCode) {
        console.log("Country restriction: ", userCountryCode);

        const restricted = urlResponse.restricted_countries.some(
            (country) => country.code.toLowerCase() === userCountryCode.toLowerCase()
        );
        if (restricted) {
            return true;
        }
    }

    // ✅ 2. Time expiration
    if (urlResponse.expire_at) {

        console.log("time expire:", urlResponse.expire_at);

        const expireAt = new Date(urlResponse.expire_at);
        if (now > expireAt) {
            return true;
        }
    }

    // ✅ 3. Clicks expiration
    if (
        urlResponse.expire_clicks !== null &&
        typeof urlResponse.expire_clicks === "number"
    ) {

        if (!urlResponse.user_id) return false;

        const clicksTillNow = await getClickCount(urlResponse.id);

        console.log("clicks", urlResponse.expire_clicks);

        if(clicksTillNow >= urlResponse.expire_clicks) return true;
    }

    // ✅ 4. Device Type Expiration
    if (urlResponse.device_type !== "BOTH") {
        console.log("Device type: ", myDeviceType);
        console.log("Device type: ", urlResponse.device_type);        
        if(urlResponse.device_type === myDeviceType) {
            return false;
        }else {
            return true;
        }
    }

    return false;
};
