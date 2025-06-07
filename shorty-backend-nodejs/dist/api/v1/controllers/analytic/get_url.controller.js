"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUrlsController = void 0;
const success_response_1 = require("../../../../utils/success_handler/success_response");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const get_urls_service_1 = require("../../../../service/analytics/get_urls.service");
const getAllUrlsController = async (req, res, next) => {
    try {
        const authUser = req.user;
        if (!authUser || !authUser.id)
            throw new ErrorStatus_1.ForbiddenError();
        const analyticUrls = await (0, get_urls_service_1.getAllAnalyticUrls)(authUser.id);
        const response = new success_response_1.SuccessResponse({
            data: analyticUrls,
            message: "Got all analytic urls",
            statusCode: 200
        });
        res.status(200).json(response);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllUrlsController = getAllUrlsController;
