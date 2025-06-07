
export type UrlAnalyticsResponse = {
    success: boolean,
    message: string,
    data: {
        urlInfo: {
            id: string,
            originalUrl: string,
            createdAt: string,
            isAnalytics: boolean,
            deviceType: "BOTH" | "MOBILE" | "DESKTOP",
            expireAt: string,
            expireClicks: number,
            expireType: string,
            expireUnit: string,
            code: string
        },
        clickAnalytics: {
            totalClicks: number;
            uniqueClicks: number;
            clicksPerDay: Record<string, number>;
        };
        geographicAnalytics: {
            topCountries: { country: string; count: number }[];
            topCities: { city: string; count: number }[];
        };
        browserAnalytics: {
            deviceTypeStats: { deviceType: string; count: number }[];
            operatingSystemStats: { operatingSystem: string; count: number }[];
            browserStats: { browser: string; count: number }[];
        };
    }
};
