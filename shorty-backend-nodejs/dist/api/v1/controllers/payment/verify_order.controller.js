"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOrderController = void 0;
const success_response_1 = require("../../../../utils/success_handler/success_response");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const crypto_1 = __importDefault(require("crypto"));
const update_service_1 = require("../../../../service/payment/update.service");
const global_mapper_1 = require("../../core/mapper/global.mapper");
const create_service_1 = require("../../../../service/pricing/create.service");
const verifyOrderController = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, payment_id } = req.body;
        const authUser = req.user;
        if (!authUser || !authUser.id)
            throw new ErrorStatus_1.ForbiddenError();
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto_1.default
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");
        const isAuthentic = expectedSignature === razorpay_signature;
        if (isAuthentic) {
            const paymentData = await (0, update_service_1.updatePaymentService)(global_mapper_1.paymentMapper['success'], payment_id);
            const total_urls = paymentData.amount / 5000;
            const pricingData = {
                userId: authUser.id,
                totalUrls: total_urls,
                isActive: true
            };
            await (0, create_service_1.createPricingService)(pricingData);
            const response = new success_response_1.SuccessResponse({
                message: "Order verified",
                statusCode: 200
            });
            res.status(200).json(response);
        }
        else {
            await (0, update_service_1.updatePaymentService)(global_mapper_1.paymentMapper['failed'], payment_id);
            throw new ErrorStatus_1.BadRequestError("Invalid input");
        }
    }
    catch (err) {
        next(err);
    }
};
exports.verifyOrderController = verifyOrderController;
