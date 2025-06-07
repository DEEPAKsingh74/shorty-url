import { prisma } from "@/infrastructure/prisma/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export type ClickAnalyticsFilters = {
    month?: number; // 1-12
    year?: number;  // full year like 2025
};

export const getClickAnalytics = async (
    urlId: string,
    filters?: ClickAnalyticsFilters
) => {
    try {
        // Step 1: Define date filter range if provided
        let dateFilter: { gte?: Date; lte?: Date } = {};

        if (filters?.month && filters?.year) {
            const fromDate = startOfMonth(new Date(filters.year, filters.month - 1));
            const toDate = endOfMonth(fromDate);
            dateFilter = { gte: fromDate, lte: toDate };
        }

        // Step 2: Fetch analytics in parallel
        const [totalClicks, uniqueClickRecords, clicksPerDay] = await Promise.all([
            // Total Clicks
            prisma.userClicks.count({
                where: {
                    urlId,
                    createdAt: dateFilter,
                },
            }),

            // Unique Clicks: fetch IPs and deduplicate manually
            prisma.userClicks.findMany({
                where: {
                    urlId,
                    createdAt: dateFilter,
                },
                select: {
                    ip: true,
                },
            }),

            // Count of clicks per day
            prisma.userClicks.groupBy({
                by: ["createdAt"],
                _count: true,
                where: {
                    urlId,
                    createdAt: dateFilter,
                },
                orderBy: {
                    createdAt: "asc",
                },
            }),
        ]);

        // Step 3: Deduplicate IPs to get unique clicks
        const uniqueClicks = new Set(
            uniqueClickRecords
                .filter((record) => record.ip !== null)
                .map((record) => record.ip!)
        ).size;

        // Step 4: Format clicks per day as { "YYYY-MM-DD": count }
        const formattedClicksPerDay = clicksPerDay.reduce((acc, row) => {
            const dateKey = row.createdAt.toISOString().split("T")[0];
            acc[dateKey] = (acc[dateKey] || 0) + row._count;
            return acc;
        }, {} as Record<string, number>);

        // Step 5: Return analytics data
        return {
            totalClicks,
            uniqueClicks,
            clicksPerDay: formattedClicksPerDay,
        };
    } catch (error) {
        throw error;
    }
};
