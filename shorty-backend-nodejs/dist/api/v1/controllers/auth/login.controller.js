"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const access_token_1 = require("../../lib/helpers/access_token");
const refresh_token_1 = require("../../lib/helpers/refresh_token");
const save_service_1 = require("../../../../service/refresh_token/save.service");
const success_response_1 = require("../../../../utils/success_handler/success_response");
const login_service_1 = require("../../../../service/auth/login.service");
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = {
            email,
            password,
        };
        const newUser = await (0, login_service_1.loginUserService)(userData);
        const accessPayload = {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
        };
        const access_token = (0, access_token_1.generateAccessToken)(accessPayload);
        const refresh_token = (0, refresh_token_1.generateRefreshToken)({ userId: accessPayload.id });
        // Save refresh token in DB
        await (0, save_service_1.saveRefreshTokenService)(refresh_token, newUser.id);
        // Set tokens as cookies
        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in prod
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });
        const successResponse = new success_response_1.SuccessResponse({
            data: {
                ...newUser,
                access_token,
                refresh_token
            },
            message: "user found"
        });
        res.status(200).json(successResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.loginController = loginController;
