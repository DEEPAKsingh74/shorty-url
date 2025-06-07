import { SuccessResponse } from "@/utils/success_handler/success_response";
import { NextFunction, Request, Response } from "express"
import { AuthenticatedRequest } from "@/middleware/auth.middleware";
import { BadRequestError, ForbiddenError } from "@/utils/error_handler/ErrorStatus";
import crypto from "crypto";
import { updatePaymentService } from "@/service/payment/update.service";
import { paymentMapper } from "../../core/mapper/global.mapper";
import { CreatePricing } from "@/types/pricing";
import { getUrlUsedCountService } from "@/service/analytics/get_url_used.service";
import { updatePricingService } from "@/service/pricing/update.service";

export const verifyOrderController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, payment_id } = req.body;

        const authUser = (req as AuthenticatedRequest).user;

        if (!authUser || !authUser.id) throw new ForbiddenError();

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {

            const payment = await getUrlUsedCountService(authUser.id);
            const paymentData = await updatePaymentService(paymentMapper['success'], payment_id);

            const total_urls = paymentData.amount / 5000;

            const pricingData: CreatePricing = {
                userId: authUser.id,
                totalUrls: payment.totalUrls + total_urls,
                isActive: true
            }
            await updatePricingService(pricingData);

            const response = new SuccessResponse({
                message: "Order verified",
                statusCode: 200
            });

            res.status(200).json(response);
        } else {
            await updatePaymentService(paymentMapper['failed'], payment_id);
            throw new BadRequestError("Invalid input")
        }

    } catch (err) {
        next(err)
    }
}