"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlInfo = void 0;
const prisma_1 = require("../../infrastructure/prisma/prisma");
const getUrlInfo = async (userId, urlId) => {
    try {
        const urlInfo = await prisma_1.prisma.url.findFirst({
            where: {
                userId,
                isAnalytics: true,
                id: urlId
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
        return urlInfo;
    }
    catch (error) {
        throw error;
    }
};
exports.getUrlInfo = getUrlInfo;
