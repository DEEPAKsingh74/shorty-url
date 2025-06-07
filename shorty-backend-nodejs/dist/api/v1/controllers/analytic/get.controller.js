"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlAnalyticsController = void 0;
const success_response_1 = require("../../../../utils/success_handler/success_response");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const get_service_1 = require("../../../../service/analytics/get.service");
const getUrlAnalyticsController = async (req, res, next) => {
    try {
        const { urlId } = req.params;
        if (!urlId || urlId == "")
            throw new ErrorStatus_1.BadRequestError("invalid url");
        const authUser = req.user;
        if (!authUser || !authUser.id)
            throw new ErrorStatus_1.ForbiddenError();
        const analytics = await (0, get_service_1.getUrlAnalyticsService)(authUser.id, urlId);
        const response = new success_response_1.SuccessResponse({
            data: analytics,
            message: "Got Url analytics",
            statusCode: 200
        });
        res.status(200).json(response);
    }
    catch (err) {
        next(err);
    }
};
exports.getUrlAnalyticsController = getUrlAnalyticsController;
