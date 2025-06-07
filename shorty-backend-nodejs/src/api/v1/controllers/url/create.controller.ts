import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { getUrlUsedCountService } from "@/service/analytics/get_url_used.service";
import { saveUrlService } from "@/service/url/save.service";
import { UrlCreateData } from "@/types/url";
import { BadRequestError } from "@/utils/error_handler/ErrorStatus";
import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express";

export const createUrlController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authUser = (req as AuthenticatedRequest).user;

        const { url, device_type, expire_data, restricted_countries } = req.body;
        let { analytics } = req.body;

        console.log("data: ", {
            url,
            device_type,
            expire_data,
            restricted_countries,
        });
        
        if (!url || url === "") throw new BadRequestError("Invalid data");

        // check if user has enough to add analytics.

        console.log("analytics: ", analytics);
        console.log("authuser id: ", authUser?.id);
        
        if (analytics && authUser?.id) {
            console.log("inside analytics");
            
            const countUrls = await getUrlUsedCountService(authUser.id);

            if (countUrls.urlUsed >= countUrls.totalUrls) analytics = false;
        }

        const urlCreateData: UrlCreateData = {
            url,
            device_type,
            restricted_countries,
            expire: {
                type: expire_data.type,
                unit: expire_data.unit,
                value: parseInt(expire_data.value, 10)
            },
            user_id: authUser?.id,
            is_analytics: analytics ?? false
        }

        console.log("Create url: ", urlCreateData);


        const urlResponse = await saveUrlService(urlCreateData);

        const successResponse = new SuccessResponse({
            data: {
                ...urlResponse
            },
            message: "url shortened",
            statusCode: 201
        });

        res.status(201).json(successResponse);

    } catch (error) {
        next(error);
    }
};
