import { prisma } from "@/infrastructure/prisma/prisma";

export const getAllAnalyticUrls = async (userId: string) => {
    try {

        const analyticUrls = await prisma.url.findMany({
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
        })

        return analyticUrls;

    } catch (error) {
        throw error;
    }
};
