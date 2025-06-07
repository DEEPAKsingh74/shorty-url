"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserService = void 0;
const user_mapper_1 = require("../../api/v1/core/mapper/user.mapper");
const client_1 = require("@prisma/client");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const ErrorStatus_1 = require("../../utils/error_handler/ErrorStatus");
const saveUserService = async (user) => {
    try {
        // check if user already exists.
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: {
                email: user.email
            }
        });
        if (existingUser != null)
            throw new ErrorStatus_1.ConflictError("user already exists");
        const newUser = await prisma_1.prisma.user.create({
            data: {
                ...user,
                authType: client_1.AuthType.credentials
            }
        });
        return (0, user_mapper_1.toUserResponse)(newUser);
    }
    catch (error) {
        throw error;
    }
};
exports.saveUserService = saveUserService;
