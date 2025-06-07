import { AuthenticatedRefreshRequest } from "@/middleware/refresh.middleware";
import { findUserService } from "@/service/auth/find_id.service";
import { ForbiddenError, NotFoundError } from "@/utils/error_handler/ErrorStatus";
import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express";
import { generateAccessToken } from "../../lib/helpers/access_token";
import { accessData } from "@/types/global";

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authUser = (req as AuthenticatedRefreshRequest).user;

        if (!authUser || !authUser.userId) throw new NotFoundError("user not found");

        // find the user with this user id and if found create the user tokens.
        const user = await findUserService(authUser.userId);

        if (!user) throw new ForbiddenError("user not found");

        const access_payload: accessData = {
            id: user.id,
            first_name: user.first_name,
            email: user.email
        }

        const access_token = generateAccessToken(access_payload);

        const successResponse = new SuccessResponse({
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

    } catch (error) {
        next(error);
    }
};
