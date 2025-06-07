"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAnalyticUrls = void 0;
const prisma_1 = require("../../infrastructure/prisma/prisma");
const getAllAnalyticUrls = async (userId) => {
    try {
        const analyticUrls = await prisma_1.prisma.url.findMany({
            where: {
                userId,
                isAnalytics: true
            },
            select: {
                id: true,
                originalUrl: true,
                createdAt: true,
                isAnalytics: true,
                deviceType: true,
                expireAt: true,
                expireClicks: true,
                expireType: true,
                expireUnit: true,
                code: true
            }
        });
        return analyticUrls;
    }
    catch (error) {
        throw error;
    }
};
exports.getAllAnalyticUrls = getAllAnalyticUrls;
