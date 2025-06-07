import { toUrlResponse } from "@/api/v1/core/mapper/url.mapper";
import { prisma } from "@/infrastructure/prisma/prisma";
import { UrlResponse } from "@/types/url";

export const findUrlService = async (code: string, countryCode: string | null): Promise<UrlResponse | null> => {
    try {

        const country = countryCode ?? "XX";

        const urlData = await prisma.url.findFirst({
            where: {
                code,
                isExpired: false,
                restrictions: {
                    none: {
                        countryCode: country
                    }
                }
            },
            include: {
                restrictions: {
                    include: {
                        country: true
                    }
                }
            }
        });


        if (!urlData) return null;

        return toUrlResponse(urlData);

    } catch (error) {
        throw error;
    }
};
