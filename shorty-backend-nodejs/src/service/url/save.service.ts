import { deviceTypeMap, expireTypeMap, expireUnitMap } from "@/api/v1/core/mapper/global.mapper";
import { toUrlResponse } from "@/api/v1/core/mapper/url.mapper";
import { ExpireType, ExpireUnit } from "@prisma/client";
import { prisma } from "@/infrastructure/prisma/prisma";
import { UrlCreateData } from "@/types/url";
import { BadRequestError } from "@/utils/error_handler/ErrorStatus";
import { generateRandom11to12DigitNumber } from "@/utils/helpers/generateRandom11to12digitNumber";
import { numberSequencer } from "@/utils/helpers/numberSequencer";
import { addMonths, addDays, addHours } from "date-fns";

export const saveUrlService = async (urlData: UrlCreateData) => {
    let attempts = 0;
    let id: number | null = null;

    try {
        while (attempts < 5) {
            id = generateRandom11to12DigitNumber();
            const existing = await prisma.url.findFirst({ where: { id: id.toString() } });
            if (!existing) break;
            attempts++;
        }

        if (!id || attempts >= 5) {
            throw new Error("Failed to generate unique ID");
        }

        const encodedUrl = numberSequencer(id);

        let expireAt: Date | null = null;
        let expireType: ExpireType | null = null;
        let expireUnit: ExpireUnit | null = null;
        let expireClicks: number | null = null;

        if (urlData.expire?.type) {
            const typeKey = urlData.expire.type.toLowerCase();
            console.log("expire type:", typeKey);
            
            expireType = expireTypeMap[typeKey];
            console.log("expire type:", expireType);

            if (!expireType) throw new BadRequestError("Invalid expiration type");

            if (expireType === ExpireType.time) {
                if (!urlData.expire.unit || !urlData.expire.value) {
                    throw new BadRequestError("Expiration unit and value are required for time-based expiration");
                }

                const unitKey = urlData.expire.unit.toLowerCase();
                expireUnit = expireUnitMap[unitKey];
                if (!expireUnit) throw new BadRequestError("Invalid expiration unit");

                const now = new Date();
                switch (expireUnit) {
                    case ExpireUnit.months:
                        expireAt = addMonths(now, urlData.expire.value);
                        break;
                    case ExpireUnit.days:
                        expireAt = addDays(now, urlData.expire.value);
                        break;
                    case ExpireUnit.hours:
                        expireAt = addHours(now, urlData.expire.value);
                        break;
                }
            } else if (expireType === ExpireType.clicks) {
                expireClicks = urlData.expire.value ?? null;
            }
        }

        const deviceTypeKey = urlData.device_type.toLowerCase();
        console.log("device type keyy:", deviceTypeKey);        
        const deviceType = deviceTypeMap[deviceTypeKey];
        console.log("device type keyy:", deviceType);        
        
        if (!deviceType) throw new BadRequestError("Invalid device type");

        const dataToSave = {
            id: id.toString(),
            code: encodedUrl,
            originalUrl: urlData.url,
            deviceType,
            isExpired: false,
            userId: urlData.user_id ?? null,
            expireType: expireType ?? null,
            expireUnit: expireUnit ?? null,
            expireAt,
            expireClicks,
            isAnalytics: urlData.is_analytics ?? false,
            restrictions: urlData.restricted_countries?.length
                ? {
                    create: urlData.restricted_countries.map((code) => ({
                        country: { connect: { code } }
                    }))
                }
                : undefined
        };

        console.log("data to save: ", dataToSave);        

        const savedUrl = await prisma.url.create({
            data: dataToSave,
            include: {
                restrictions: { include: { country: true } }
            }
        });

        return toUrlResponse(savedUrl);
    } catch (error) {
        console.error("Error in saveUrlService:", error);
        throw error;
    }
};
