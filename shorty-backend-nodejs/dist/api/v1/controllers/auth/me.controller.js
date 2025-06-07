"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meController = void 0;
const find_id_service_1 = require("../../../../service/auth/find_id.service");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const success_response_1 = require("../../../../utils/success_handler/success_response");
const meController = async (req, res, next) => {
    try {
        const authUser = req.user;
        if (!authUser || !authUser.id)
            throw new ErrorStatus_1.ForbiddenError("Invalid user");
        const user = await (0, find_id_service_1.findUserService)(authUser.id);
        const successResponse = new success_response_1.SuccessResponse({
            data: {
                ...user
            },
            message: "user found"
        });
        res.status(200).json(successResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.meController = meController;
