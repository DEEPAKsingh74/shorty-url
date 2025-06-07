"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrlController = void 0;
const get_url_used_service_1 = require("../../../../service/analytics/get_url_used.service");
const save_service_1 = require("../../../../service/url/save.service");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const success_response_1 = require("../../../../utils/success_handler/success_response");
const createUrlController = async (req, res, next) => {
    try {
        const authUser = req.user;
        const { url, device_type, expire_data, restricted_countries } = req.body;
        let { analytics } = req.body;
        console.log("data: ", {
            url,
            device_type,
            expire_data,
            restricted_countries,
        });
        if (!url || url === "")
            throw new ErrorStatus_1.BadRequestError("Invalid data");
        // check if user has enough to add analytics.
        console.log("analytics: ", analytics);
        console.log("authuser id: ", authUser?.id);
        if (analytics && authUser?.id) {
            console.log("inside analytics");
            const countUrls = await (0, get_url_used_service_1.getUrlUsedCountService)(authUser.id);
            if (countUrls.urlUsed >= countUrls.totalUrls)
                analytics = false;
        }
        const urlCreateData = {
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
        };
        console.log("Create url: ", urlCreateData);
        const urlResponse = await (0, save_service_1.saveUrlService)(urlCreateData);
        const successResponse = new success_response_1.SuccessResponse({
            data: {
                ...urlResponse
            },
            message: "url shortened",
            statusCode: 201
        });
        res.status(201).json(successResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.createUrlController = createUrlController;
