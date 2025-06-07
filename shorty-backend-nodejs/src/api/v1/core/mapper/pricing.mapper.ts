import { Pricing } from "@prisma/client";
import { PricingResponse } from "@/types/pricing";

export const toPricingResponse = (price: Pricing): PricingResponse => {
  return {
    id: price.id,
    userId: price.userId,
    isActive: price.isActive,
    totalUrls: price.totalUrls,
    created_at: price.createdAt.toISOString(),
  };
};
