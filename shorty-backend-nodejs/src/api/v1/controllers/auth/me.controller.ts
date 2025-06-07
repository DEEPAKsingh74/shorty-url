import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { findUserService } from "@/service/auth/find_id.service";
import { ForbiddenError } from "@/utils/error_handler/ErrorStatus";
import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express";

export const meController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authUser = (req as AuthenticatedRequest).user;

        if (!authUser || !authUser.id) throw new ForbiddenError("Invalid user");

        const user = await findUserService(authUser.id);

        const successResponse = new SuccessResponse({
            data: {
                ...user
            },
            message: "user found"
        });

        res.status(200).json(successResponse);

    } catch (error) {
        next(error);
    }
};
