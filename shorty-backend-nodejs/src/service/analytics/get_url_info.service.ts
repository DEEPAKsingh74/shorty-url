import { prisma } from "@/infrastructure/prisma/prisma";

export const getUrlInfo = async (userId: string, urlId: string) => {
    try {

        const urlInfo = await prisma.url.findFirst({
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
        })

        return urlInfo;

    } catch (error) {
        throw error;
    }
};
