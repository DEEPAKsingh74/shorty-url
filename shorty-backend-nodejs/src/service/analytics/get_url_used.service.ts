import { prisma } from "@/infrastructure/prisma/prisma";

export const getUrlUsedCountService = async (userId: string) => {
    try {
        // Get the count of URLs used by the user
        const urlUsedCount = await prisma.url.count({
            where: {
                userId: userId,
                isAnalytics: true,
            },
        });

        console.log("url used count: ", urlUsedCount);
        
        
        const pricing = await prisma.pricing.findFirst({
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
    } catch (error) {
        throw error;
    }
};
