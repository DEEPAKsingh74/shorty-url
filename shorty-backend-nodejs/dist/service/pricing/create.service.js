"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPricingService = void 0;
const pricing_mapper_1 = require("../../api/v1/core/mapper/pricing.mapper");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const createPricingService = async (pricing) => {
    try {
        const pricingData = await prisma_1.prisma.pricing.create({
            data: pricing
        });
        return (0, pricing_mapper_1.toPricingResponse)(pricingData);
    }
    catch (error) {
        throw error;
    }
};
exports.createPricingService = createPricingService;
