import { toPricingResponse } from "@/api/v1/core/mapper/pricing.mapper";
import { prisma } from "@/infrastructure/prisma/prisma";
import { CreatePricing, PricingResponse } from "@/types/pricing";

export const createPricingService = async (pricing: CreatePricing): Promise<PricingResponse> => {

    try {

        const pricingData = await prisma.pricing.create({
            data: pricing
        })

        return toPricingResponse(pricingData);

    } catch (error) {
        throw error;
    }

}