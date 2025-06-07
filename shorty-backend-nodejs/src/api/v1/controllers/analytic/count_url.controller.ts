import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express"
import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { ForbiddenError } from "@/utils/error_handler/ErrorStatus";
import { getUrlUsedCountService } from "@/service/analytics/get_url_used.service";

export const getUrlCountController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authUser = (req as AuthenticatedRequest).user;

        if(!authUser || !authUser.id) throw new ForbiddenError();

        const countUrls = await getUrlUsedCountService(authUser.id);

        const response = new SuccessResponse({
            data: countUrls,
            message: "Got Url Counts",
            statusCode: 200
        });

        res.status(200).json(response);

    } catch (err) {
        next(err)
    }
}