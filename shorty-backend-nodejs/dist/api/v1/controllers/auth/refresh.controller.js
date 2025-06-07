"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const find_id_service_1 = require("../../../../service/auth/find_id.service");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const success_response_1 = require("../../../../utils/success_handler/success_response");
const access_token_1 = require("../../lib/helpers/access_token");
const refreshTokenController = async (req, res, next) => {
    try {
        const authUser = req.user;
        if (!authUser || !authUser.userId)
            throw new ErrorStatus_1.NotFoundError("user not found");
        // find the user with this user id and if found create the user tokens.
        const user = await (0, find_id_service_1.findUserService)(authUser.userId);
        if (!user)
            throw new ErrorStatus_1.ForbiddenError("user not found");
        const access_payload = {
            id: user.id,
            first_name: user.first_name,
            email: user.email
        };
        const access_token = (0, access_token_1.generateAccessToken)(access_payload);
        const successResponse = new success_response_1.SuccessResponse({
            data: {
                access_token,
                ...user
            },
            message: "user found"
        });
        // Set tokens as cookies
        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.status(200).json(successResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.refreshTokenController = refreshTokenController;
