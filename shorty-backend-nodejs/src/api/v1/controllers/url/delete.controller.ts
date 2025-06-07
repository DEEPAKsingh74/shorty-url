import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { deleteUrlService } from "@/service/url/delete.service";
import { NotFoundError, UnauthorizedError } from "@/utils/error_handler/ErrorStatus";
import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express";

export const deleteUrlController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authUser = (req as AuthenticatedRequest).user;

        const { id } = req.params;

        console.log(" code here is : ", id);
        if (!authUser?.id) throw new UnauthorizedError();

        if (!id || id == "") throw new NotFoundError();

        await deleteUrlService(id, authUser?.id);

        const successResponse = new SuccessResponse({
            message: "url deleted",
            statusCode: 200
        });

        res.status(200).json(successResponse);
        return;

    } catch (error) {
        next(error);
    }
};
