// api/v1/core/mapper/url.mapper.ts

import { Country, Url, UrlCountryRestriction } from "@prisma/client";
import { UrlResponse } from "@/types/url";

type UrlWithRelations = Url & {
    restrictions: (UrlCountryRestriction & {
        country: Country;
    })[];
};

export const toUrlResponse = (url: UrlWithRelations): UrlResponse => {
    return {
        id: url.id,
        short_url: `http://localhost:8000/${url.code}`,
        original_url: url.originalUrl,
        device_type: url.deviceType,
        created_at: url.createdAt.toISOString(),
        updated_at: url.updatedAt.toISOString(),
        is_expired: url.isExpired,
        expire_type: url.expireType,
        expire_unit: url.expireUnit,
        is_analytics: url.isAnalytics,
        expire_clicks: url.expireClicks,
        expire_at: url.expireAt ? url.expireAt.toISOString() : null,
        user_id: url.userId,
        restricted_countries: url.restrictions.map((r) => ({
            code: r.country.code,
            name: r.country.name,
        })),
    };
};
