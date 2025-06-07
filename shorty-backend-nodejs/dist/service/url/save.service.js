"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUrlService = void 0;
const global_mapper_1 = require("../../api/v1/core/mapper/global.mapper");
const url_mapper_1 = require("../../api/v1/core/mapper/url.mapper");
const client_1 = require("@prisma/client");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const ErrorStatus_1 = require("../../utils/error_handler/ErrorStatus");
const generateRandom11to12digitNumber_1 = require("../../utils/helpers/generateRandom11to12digitNumber");
const numberSequencer_1 = require("../../utils/helpers/numberSequencer");
const date_fns_1 = require("date-fns");
const saveUrlService = async (urlData) => {
    let attempts = 0;
    let id = null;
    try {
        while (attempts < 5) {
            id = (0, generateRandom11to12digitNumber_1.generateRandom11to12DigitNumber)();
            const existing = await prisma_1.prisma.url.findFirst({ where: { id: id.toString() } });
            if (!existing)
                break;
            attempts++;
        }
        if (!id || attempts >= 5) {
            throw new Error("Failed to generate unique ID");
        }
        const encodedUrl = (0, numberSequencer_1.numberSequencer)(id);
        let expireAt = null;
        let expireType = null;
        let expireUnit = null;
        let expireClicks = null;
        if (urlData.expire?.type) {
            const typeKey = urlData.expire.type.toLowerCase();
            console.log("expire type:", typeKey);
            expireType = global_mapper_1.expireTypeMap[typeKey];
            console.log("expire type:", expireType);
            if (!expireType)
                throw new ErrorStatus_1.BadRequestError("Invalid expiration type");
            if (expireType === client_1.ExpireType.time) {
                if (!urlData.expire.unit || !urlData.expire.value) {
                    throw new ErrorStatus_1.BadRequestError("Expiration unit and value are required for time-based expiration");
                }
                const unitKey = urlData.expire.unit.toLowerCase();
                expireUnit = global_mapper_1.expireUnitMap[unitKey];
                if (!expireUnit)
                    throw new ErrorStatus_1.BadRequestError("Invalid expiration unit");
                const now = new Date();
                switch (expireUnit) {
                    case client_1.ExpireUnit.months:
                        expireAt = (0, date_fns_1.addMonths)(now, urlData.expire.value);
                        break;
                    case client_1.ExpireUnit.days:
                        expireAt = (0, date_fns_1.addDays)(now, urlData.expire.value);
                        break;
                    case client_1.ExpireUnit.hours:
                        expireAt = (0, date_fns_1.addHours)(now, urlData.expire.value);
                        break;
                }
            }
            else if (expireType === client_1.ExpireType.clicks) {
                expireClicks = urlData.expire.value ?? null;
            }
        }
        const deviceTypeKey = urlData.device_type.toLowerCase();
        console.log("device type keyy:", deviceTypeKey);
        const deviceType = global_mapper_1.deviceTypeMap[deviceTypeKey];
        console.log("device type keyy:", deviceType);
        if (!deviceType)
            throw new ErrorStatus_1.BadRequestError("Invalid device type");
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
        const savedUrl = await prisma_1.prisma.url.create({
            data: dataToSave,
            include: {
                restrictions: { include: { country: true } }
            }
        });
        return (0, url_mapper_1.toUrlResponse)(savedUrl);
    }
    catch (error) {
        console.error("Error in saveUrlService:", error);
        throw error;
    }
};
exports.saveUrlService = saveUrlService;
