export interface CreatePricing {
    userId: string;
    totalUrls: number;
    isActive: boolean
}

export interface PricingResponse extends CreatePricing {
    id: string;
    created_at: string
}