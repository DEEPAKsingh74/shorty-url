"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUrlService = void 0;
const url_mapper_1 = require("../../api/v1/core/mapper/url.mapper");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const findUrlService = async (code, countryCode) => {
    try {
        const country = countryCode ?? "XX";
        const urlData = await prisma_1.prisma.url.findFirst({
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
        if (!urlData)
            return null;
        return (0, url_mapper_1.toUrlResponse)(urlData);
    }
    catch (error) {
        throw error;
    }
};
exports.findUrlService = findUrlService;
