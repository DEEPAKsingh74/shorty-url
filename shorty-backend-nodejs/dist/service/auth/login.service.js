"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserService = void 0;
const user_mapper_1 = require("../../api/v1/core/mapper/user.mapper");
const becrypt_hash_1 = require("../../api/v1/lib/helpers/becrypt_hash");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const ErrorStatus_1 = require("../../utils/error_handler/ErrorStatus");
const loginUserService = async (user) => {
    try {
        // check if user already exists.
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: {
                email: user.email
            }
        });
        if (existingUser == null || existingUser.password == null)
            throw new ErrorStatus_1.NotFoundError("Invalid Credentials");
        if (!(await (0, becrypt_hash_1.compareHash)(user.password, existingUser.password))) {
            throw new ErrorStatus_1.BadRequestError("Invalid Credentials");
        }
        return (0, user_mapper_1.toUserResponse)(existingUser);
    }
    catch (error) {
        throw error;
    }
};
exports.loginUserService = loginUserService;
