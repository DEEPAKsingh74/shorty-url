import { saveUserService } from "@/service/auth/save.service";
import { UserData } from "@/types";
import { NextFunction, Request, Response } from "express";
import { hashString } from "../../lib/helpers/becrypt_hash";
import { generateAccessToken } from "../../lib/helpers/access_token";
import { generateRefreshToken } from "../../lib/helpers/refresh_token";
import { saveRefreshTokenService } from "@/service/refresh_token/save.service";
import { accessData } from "@/types/global";
import { SuccessResponse } from "@/utils/success_handler/success_response";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { full_name, email, password } = req.body;

        let first_name = "", last_name = "";
        if (full_name && full_name.trim() !== "") {
            const parts = full_name.split(" ");
            first_name = parts[0] ?? "";
            last_name = parts[1] ?? "";
        }

        const hashedPassword = await hashString(password);

        const userData: UserData = {
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword,
        };

        const newUser = await saveUserService(userData);

        const accessPayload: accessData = {
            id: newUser.id,
            email: newUser.email,
            first_name: newUser.first_name,
        };

        console.log("setp - 1");
        
        const access_token = generateAccessToken(accessPayload);
        console.log("setp - 2");
        const refresh_token = generateRefreshToken({userId: accessPayload.id});
        
        console.log("setp - 3");
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
        
        console.log("setp - 4");
        const successResponse = new SuccessResponse({
            data: {
                ...newUser,
                access_token,
                refresh_token
            },
            message: "user created"
        })
        res.status(201).json(successResponse);

    } catch (error) {
        next(error);
    }
};
