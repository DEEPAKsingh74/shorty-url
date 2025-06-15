import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { findUrlService } from "@/service/url/find.service";
import { isUrlExpired } from "@/service/url/is_expired.service";
import { recordClickAnalytics } from "@/service/url/record.analytics.service";
import { NotFoundError } from "@/utils/error_handler/ErrorStatus";
import { getClientIp } from "@/utils/helpers/getClientIp";
import { getCountryCodeFromIP } from "@/utils/helpers/getCountryCodeFromIp";
import { getDeviceType } from "@/utils/helpers/getDeviceType";
import { NextFunction, Request, Response } from "express";

export const getUrlController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const authUser = (req as AuthenticatedRequest).user;

        const { code } = req.params;

        console.log(" code here is : ", code);

        if (!code || code == "") throw new NotFoundError();

        const countryCode = getCountryCodeFromIP(getClientIp(req));

        const urlResponse = await findUrlService(code, countryCode);

        console.log("url Response: ", urlResponse);

        if (!urlResponse) throw new NotFoundError();

        const deviceType = getDeviceType(req.headers['user-agent']);

        // check if the url is expired
        const isExpired = await isUrlExpired(urlResponse, countryCode, deviceType);
        console.log("Is url expired:", isExpired);
        
        if (isExpired) throw new NotFoundError();

        console.log(" is analytics: ", urlResponse.is_analytics);


        // 🚀 Fire-and-forget analytics logging
        if (urlResponse.is_analytics) {
            (async () => {
                try {
                    await recordClickAnalytics({
                        userId: authUser?.id,
                        urlId: urlResponse.id,
                        ip: getClientIp(req),
                        userAgent: req.headers['user-agent'],
                    });
                } catch (err) {
                    console.error("Analytics logging failed", err);
                }
            })();
        }

        return res.redirect(301, urlResponse.original_url);

    } catch (error) {
        next(error);
    }
};
