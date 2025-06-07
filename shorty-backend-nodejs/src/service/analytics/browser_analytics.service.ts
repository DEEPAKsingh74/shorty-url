import { prisma } from "@/infrastructure/prisma/prisma";

export const getBrowserAnalytics = async (urlId: string) => {
    try {
        const [deviceStats, osStats, browserStats] = await Promise.all([
            // Group by deviceType
            prisma.userClicks.groupBy({
                by: ["deviceType"],
                where: { urlId },
                _count: { id: true },
                orderBy: {
                    _count: {
                        id: "desc",
                    },
                },
            }),

            // Group by operatingSystem
            prisma.userClicks.groupBy({
                by: ["operatingSystem"],
                where: { urlId },
                _count: { id: true },
                orderBy: {
                    _count: {
                        id: "desc",
                    },
                },
            }),

            // Group by browser
            prisma.userClicks.groupBy({
                by: ["browser"],
                where: { urlId },
                _count: { id: true },
                orderBy: {
                    _count: {
                        id: "desc",
                    },
                },
            }),
        ]);

        return {
            deviceTypeStats: deviceStats.map((entry) => ({
                deviceType: entry.deviceType,
                count: entry._count.id,
            })),
            operatingSystemStats: osStats.map((entry) => ({
                operatingSystem: entry.operatingSystem,
                count: entry._count.id,
            })),
            browserStats: browserStats.map((entry) => ({
                browser: entry.browser,
                count: entry._count.id,
            })),
        };
    } catch (error) {
        throw error;
    }
};
