"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeographicAnalytics = void 0;
const prisma_1 = require("../../infrastructure/prisma/prisma");
const getGeographicAnalytics = async (urlId) => {
    try {
        // Group by country
        const countryStats = await prisma_1.prisma.userClicks.groupBy({
            by: ["country"],
            where: { urlId },
            _count: {
                id: true, // counting clicks using unique ID
            },
            orderBy: {
                _count: {
                    id: "desc",
                },
            },
        });
        // Group by city
        const cityStats = await prisma_1.prisma.userClicks.groupBy({
            by: ["city"],
            where: { urlId },
            _count: {
                id: true,
            },
            orderBy: {
                _count: {
                    id: "desc",
                },
            },
        });
        return {
            topCountries: countryStats.map((entry) => ({
                country: entry.country,
                clicks: entry._count.id,
            })),
            topCities: cityStats
                .filter((entry) => entry.city !== null)
                .map((entry) => ({
                city: entry.city,
                clicks: entry._count.id,
            })),
        };
    }
    catch (error) {
        throw error;
    }
};
exports.getGeographicAnalytics = getGeographicAnalytics;
