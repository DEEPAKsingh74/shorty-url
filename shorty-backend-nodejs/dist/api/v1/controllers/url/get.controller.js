"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlController = void 0;
const find_service_1 = require("../../../../service/url/find.service");
const is_expired_service_1 = require("../../../../service/url/is_expired.service");
const record_analytics_service_1 = require("../../../../service/url/record.analytics.service");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const getClientIp_1 = require("../../../../utils/helpers/getClientIp");
const getCountryCodeFromIp_1 = require("../../../../utils/helpers/getCountryCodeFromIp");
const getUrlController = async (req, res, next) => {
    try {
        const authUser = req.user;
        const { code } = req.params;
        console.log(" code here is : ", code);
        if (!code || code == "")
            throw new ErrorStatus_1.NotFoundError();
        const countryCode = (0, getCountryCodeFromIp_1.getCountryCodeFromIP)((0, getClientIp_1.getClientIp)(req));
        const urlResponse = await (0, find_service_1.findUrlService)(code, countryCode);
        console.log("url Response: ", urlResponse);
        if (!urlResponse)
            throw new ErrorStatus_1.NotFoundError();
        // check if the url is expired
        const isExpired = (0, is_expired_service_1.isUrlExpired)(urlResponse);
        if (isExpired)
            throw new ErrorStatus_1.NotFoundError();
        console.log(" is analytics: ", urlResponse.is_analytics);
        // 🚀 Fire-and-forget analytics logging
        if (urlResponse.is_analytics) {
            (async () => {
                try {
                    await (0, record_analytics_service_1.recordClickAnalytics)({
                        userId: authUser?.id,
                        urlId: urlResponse.id,
                        ip: (0, getClientIp_1.getClientIp)(req),
                        userAgent: req.headers['user-agent'],
                    });
                }
                catch (err) {
                    console.error("Analytics logging failed", err);
                }
            })();
        }
        return res.redirect(301, urlResponse.original_url);
    }
    catch (error) {
        next(error);
    }
};
exports.getUrlController = getUrlController;
