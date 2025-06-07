import { authMiddleware } from "@/middleware/auth.middleware";
import { Request, Response, Router } from "express";
import { createOrderController } from "../controllers/payment/create_order.controller";
import { validate } from "@/middleware/validator";
import { orderSchema } from "../lib/validator/payment/create_order_schema";
import { verifyOrderSchema } from "../lib/validator/payment/verify_order_schema";
import { verifyOrderController } from "../controllers/payment/verify_order.controller";

const paymentRouter = Router();

paymentRouter.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({ message: "payment is working" });
})

paymentRouter.post(
    "/create-order",
    validate(orderSchema),
    authMiddleware,
    createOrderController
)


paymentRouter.post(
    "/verify",
    validate(verifyOrderSchema),
    authMiddleware,
    verifyOrderController
)


export default paymentRouter;