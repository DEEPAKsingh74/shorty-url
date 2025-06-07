import { toPricingResponse } from "@/api/v1/core/mapper/pricing.mapper";
import { prisma } from "@/infrastructure/prisma/prisma";
import { CreatePricing, PricingResponse } from "@/types/pricing";

export const updatePricingService = async (pricing: CreatePricing): Promise<PricingResponse> => {
    try {
        const existingPricing = await prisma.pricing.findUnique({
            where: {
                userId: pricing.userId,
            },
        });

        if (existingPricing) {
            const updatedPricing = await prisma.pricing.update({
                where: {
                    userId: pricing.userId,
                },
                data: {
                    totalUrls: pricing.totalUrls,
                    isActive: pricing.isActive,
                },
            });

            return toPricingResponse(updatedPricing);
        } else {
            // If no pricing record exists, optionally create a new one
            const newPricing = await prisma.pricing.create({
                data: pricing,
            });

            return toPricingResponse(newPricing);
        }
    } catch (error) {
        throw error;
    }
};
