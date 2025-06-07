"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderController = void 0;
const create_service_1 = require("../../../../service/order/create.service");
const success_response_1 = require("../../../../utils/success_handler/success_response");
const uuid_1 = require("uuid");
const global_mapper_1 = require("../../core/mapper/global.mapper");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const create_service_2 = require("../../../../service/payment/create.service");
const createOrderController = async (req, res, next) => {
    try {
        const { amount, currency } = req.body;
        const authUser = req.user;
        if (!authUser || !authUser.id)
            throw new ErrorStatus_1.ForbiddenError();
        const receipt = `rcpt_${(0, uuid_1.v4)().split('-')[0]}`;
        const order = await (0, create_service_1.createOrderService)({ amount, currency, receipt });
        const paymentData = {
            userId: authUser?.id,
            amount: amount,
            currency,
            status: global_mapper_1.paymentMapper["pending"]
        };
        await (0, create_service_2.createPaymentService)(paymentData);
        const response = new success_response_1.SuccessResponse({
            data: order,
            message: "Order Created",
            statusCode: 201
        });
        res.status(201).json(response);
    }
    catch (err) {
        next(err);
    }
};
exports.createOrderController = createOrderController;
