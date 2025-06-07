"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = void 0;
const save_service_1 = require("../../../../service/auth/save.service");
const becrypt_hash_1 = require("../../lib/helpers/becrypt_hash");
const access_token_1 = require("../../lib/helpers/access_token");
const refresh_token_1 = require("../../lib/helpers/refresh_token");
const save_service_2 = require("../../../../service/refresh_token/save.service");
const success_response_1 = require("../../../../utils/success_handler/success_response");
const registerController = async (req, res, next) => {
    try {
        const { full_name, email, password } = req.body;
        let first_name = "", last_name = "";
        if (full_name && full_name.trim() !== "") {
            const parts = full_name.split(" ");
            first_name = parts[0] ?? "";
            last_name = parts[1] ?? "";
        }
        const hashedPassword = await (0, becrypt_hash_1.hashString)(password);
        const userData = {
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword,
        };
        const newUser = await (0, save_service_1.saveUserService)(userData);
        const accessPayload = {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
        };
        console.log("setp - 1");
        const access_token = (0, access_token_1.generateAccessToken)(accessPayload);
        console.log("setp - 2");
        const refresh_token = (0, refresh_token_1.generateRefreshToken)({ userId: accessPayload.id });
        console.log("setp - 3");
        // Save refresh token in DB
        await (0, save_service_2.saveRefreshTokenService)(refresh_token, newUser.id);
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
        console.log("setp - 4");
        const successResponse = new success_response_1.SuccessResponse({
            data: {
                ...newUser,
                access_token,
                refresh_token
            },
            message: "user created"
        });
        res.status(201).json(successResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.registerController = registerController;
