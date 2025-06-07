"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveRefreshTokenService = void 0;
const prisma_1 = require("../../infrastructure/prisma/prisma");
const date_fns_1 = require("date-fns");
const saveRefreshTokenService = async (token, userId) => {
    try {
        const expireAt = (0, date_fns_1.addDays)(new Date(), 30);
        await prisma_1.prisma.refreshToken.create({
            data: {
                token: token,
                expireAt,
                userId
            }
        });
    }
    catch (error) {
        throw error;
    }
};
exports.saveRefreshTokenService = saveRefreshTokenService;
