"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlAnalyticsService = void 0;
const prisma_1 = require("../../infrastructure/prisma/prisma");
const ErrorStatus_1 = require("../../utils/error_handler/ErrorStatus");
const click_analytics_service_1 = require("./click_analytics.service");
const geo_analytics_service_1 = require("./geo_analytics.service");
const browser_analytics_service_1 = require("./browser_analytics.service");
const get_url_info_service_1 = require("./get_url_info.service");
const getUrlAnalyticsService = async (userId, urlId, filters) => {
    try {
        // Step 1: Authorization - check if the URL belongs to this user
        const url = await prisma_1.prisma.url.findFirst({
            where: {
                id: urlId,
                userId,
            },
        });
        if (!url)
            throw new ErrorStatus_1.NotFoundError("Either url not found or deleted");
        //get url information
        const urlInfo = await (0, get_url_info_service_1.getUrlInfo)(userId, urlId);
        // get click analytics.
        const clickAnalytics = await (0, click_analytics_service_1.getClickAnalytics)(urlId, filters);
        // get geographic analytics
        const geographicAnalytics = await (0, geo_analytics_service_1.getGeographicAnalytics)(urlId);
        // get browser analytics
        const browserAnalytics = await (0, browser_analytics_service_1.getBrowserAnalytics)(urlId);
        console.log("Analytics data: ", clickAnalytics);
        console.log("Analytics data: ", geographicAnalytics);
        console.log("Analytics data: ", browserAnalytics);
        return {
            urlInfo,
            clickAnalytics,
            geographicAnalytics,
            browserAnalytics
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getUrlAnalyticsService = getUrlAnalyticsService;
