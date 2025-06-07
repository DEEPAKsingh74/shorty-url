"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const express_1 = require("express");
const create_order_controller_1 = require("../controllers/payment/create_order.controller");
const validator_1 = require("../../../middleware/validator");
const create_order_schema_1 = require("../lib/validator/payment/create_order_schema");
const verify_order_schema_1 = require("../lib/validator/payment/verify_order_schema");
const verify_order_controller_1 = require("../controllers/payment/verify_order.controller");
const paymentRouter = (0, express_1.Router)();
paymentRouter.get("/health", (_req, res) => {
    res.status(200).json({ message: "payment is working" });
});
paymentRouter.post("/create-order", (0, validator_1.validate)(create_order_schema_1.orderSchema), auth_middleware_1.authMiddleware, create_order_controller_1.createOrderController);
paymentRouter.post("/verify", (0, validator_1.validate)(verify_order_schema_1.verifyOrderSchema), auth_middleware_1.authMiddleware, verify_order_controller_1.verifyOrderController);
exports.default = paymentRouter;
