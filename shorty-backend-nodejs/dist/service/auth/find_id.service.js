"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserService = void 0;
const user_mapper_1 = require("../../api/v1/core/mapper/user.mapper");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const findUserService = async (userId) => {
    try {
        // check if user already exists.
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!existingUser)
            return null;
        return (0, user_mapper_1.toUserResponse)(existingUser);
    }
    catch (error) {
        throw error;
    }
};
exports.findUserService = findUserService;
