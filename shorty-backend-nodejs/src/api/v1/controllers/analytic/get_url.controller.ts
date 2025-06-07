import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express"
import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { ForbiddenError } from "@/utils/error_handler/ErrorStatus";
import { getAllAnalyticUrls } from "@/service/analytics/get_urls.service";

export const getAllUrlsController = async (req: Request, res: Response, next: NextFunction) => {
    try {


        const authUser = (req as AuthenticatedRequest).user;

        if (!authUser || !authUser.id) throw new ForbiddenError();

        const analyticUrls = await getAllAnalyticUrls(authUser.id);

        const response = new SuccessResponse({
            data: analyticUrls,
            message: "Got all analytic urls",
            statusCode: 200
        });

        res.status(200).json(response);

    } catch (err) {
        next(err)
    }
}