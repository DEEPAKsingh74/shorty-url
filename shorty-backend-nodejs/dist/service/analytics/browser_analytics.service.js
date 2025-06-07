"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBrowserAnalytics = void 0;
const prisma_1 = require("../../infrastructure/prisma/prisma");
const getBrowserAnalytics = async (urlId) => {
    try {
        const [deviceStats, osStats, browserStats] = await Promise.all([
            // Group by deviceType
            prisma_1.prisma.userClicks.groupBy({
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
            prisma_1.prisma.userClicks.groupBy({
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
            prisma_1.prisma.userClicks.groupBy({
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
    }
    catch (error) {
        throw error;
    }
};
exports.getBrowserAnalytics = getBrowserAnalytics;
