"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlCountController = void 0;
const success_response_1 = require("../../../../utils/success_handler/success_response");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const get_url_used_service_1 = require("../../../../service/analytics/get_url_used.service");
const getUrlCountController = async (req, res, next) => {
    try {
        const authUser = req.user;
        if (!authUser || !authUser.id)
            throw new ErrorStatus_1.ForbiddenError();
        const countUrls = await (0, get_url_used_service_1.getUrlUsedCountService)(authUser.id);
        const response = new success_response_1.SuccessResponse({
            data: countUrls,
            message: "Got Url Counts",
            statusCode: 200
        });
        res.status(200).json(response);
    }
    catch (err) {
        next(err);
    }
};
exports.getUrlCountController = getUrlCountController;
