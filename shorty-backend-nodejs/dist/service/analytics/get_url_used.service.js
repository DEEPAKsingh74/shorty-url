"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlUsedCountService = void 0;
const prisma_1 = require("../../infrastructure/prisma/prisma");
const getUrlUsedCountService = async (userId) => {
    try {
        // Get the count of URLs used by the user
        const urlUsedCount = await prisma_1.prisma.url.count({
            where: {
                userId: userId,
                isAnalytics: true,
            },
        });
        console.log("url used count: ", urlUsedCount);
        const pricing = await prisma_1.prisma.pricing.findFirst({
            where: {
                userId: userId,
                isActive: true,
            },
            select: {
                totalUrls: true,
            },
        });
        console.log("pricing: ", pricing);
        return {
            urlUsed: urlUsedCount,
            totalUrls: pricing?.totalUrls ?? 0,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getUrlUsedCountService = getUrlUsedCountService;
