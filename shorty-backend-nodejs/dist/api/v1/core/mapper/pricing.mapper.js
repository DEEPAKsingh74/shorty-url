"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPricingResponse = void 0;
const toPricingResponse = (price) => {
    return {
        id: price.id,
        userId: price.userId,
        isActive: price.isActive,
        totalUrls: price.totalUrls,
        created_at: price.createdAt.toISOString(),
    };
};
exports.toPricingResponse = toPricingResponse;
