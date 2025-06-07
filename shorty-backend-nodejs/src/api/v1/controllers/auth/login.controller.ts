import { UserData } from "@/types";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "../../lib/helpers/access_token";
import { generateRefreshToken } from "../../lib/helpers/refresh_token";
import { saveRefreshTokenService } from "@/service/refresh_token/save.service";
import { accessData } from "@/types/global";
import { SuccessResponse } from "@/utils/success_handler/success_response";
import { loginUserService } from "@/service/auth/login.service";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const userData: UserData = {
            email,
            password,
        };

        const newUser = await loginUserService(userData);

        const accessPayload: accessData = {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
        };

        const access_token = generateAccessToken(accessPayload);
        const refresh_token = generateRefreshToken({userId: accessPayload.id});

        // Save refresh token in DB
        await saveRefreshTokenService(refresh_token, newUser.id);

        // Set tokens as cookies
        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // true in prod
            sameSite: "lax",
            maxAge: 24* 60 * 60 * 1000, // 1 day
        });

        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        const successResponse = new SuccessResponse({
            data: {
                ...newUser,
                access_token,
                refresh_token
            },
            message: "user found"
        })
        res.status(200).json(successResponse);

    } catch (error) {
        next(error);
    }
};
