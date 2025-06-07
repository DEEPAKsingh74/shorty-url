import { prisma } from "@/infrastructure/prisma/prisma";
import { NotFoundError } from "@/utils/error_handler/ErrorStatus";
import { ClickAnalyticsFilters, getClickAnalytics } from "./click_analytics.service";
import { getGeographicAnalytics } from "./geo_analytics.service";
import { getBrowserAnalytics } from "./browser_analytics.service";
import { getUrlInfo } from "./get_url_info.service";

export const getUrlAnalyticsService = async (
    userId: string,
    urlId: string,
    filters?: ClickAnalyticsFilters
) => {
    try {
        // Step 1: Authorization - check if the URL belongs to this user
        const url = await prisma.url.findFirst({
            where: {
                id: urlId,
                userId,
            },
        });

        if (!url) throw new NotFoundError("Either url not found or deleted");

        //get url information
        const urlInfo = await getUrlInfo(userId, urlId);

        // get click analytics.
        const clickAnalytics = await getClickAnalytics(urlId, filters);

        // get geographic analytics
        const geographicAnalytics = await getGeographicAnalytics(urlId);

        // get browser analytics
        const browserAnalytics = await getBrowserAnalytics(urlId);

        console.log("Analytics data: ", clickAnalytics);
        console.log("Analytics data: ", geographicAnalytics);
        console.log("Analytics data: ", browserAnalytics);

        return {
            urlInfo,
            clickAnalytics,
            geographicAnalytics,
            browserAnalytics
        }

    } catch (error) {
        throw error;
    }
};
