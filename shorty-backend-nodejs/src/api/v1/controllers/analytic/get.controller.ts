import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express"
import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { BadRequestError, ForbiddenError } from "@/utils/error_handler/ErrorStatus";
import { getUrlAnalyticsService } from "@/service/analytics/get.service";

export const getUrlAnalyticsController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const {urlId} = req.params;
        if(!urlId || urlId == "") throw new BadRequestError("invalid url");

        const authUser = (req as AuthenticatedRequest).user;

        if(!authUser || !authUser.id) throw new ForbiddenError();

        const analytics = await getUrlAnalyticsService(authUser.id, urlId);

        const response = new SuccessResponse({
            data: analytics,
            message: "Got Url analytics",
            statusCode: 200
        });

        res.status(200).json(response);

    } catch (err) {
        next(err)
    }
}