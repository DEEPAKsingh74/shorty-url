"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const success_response_1 = require("../../../utils/success_handler/success_response");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const url_routes_1 = __importDefault(require("./url.routes"));
const analytics_routes_1 = __importDefault(require("./analytics.routes"));
const payment_routes_1 = __importDefault(require("./payment.routes"));
const router_v1 = (0, express_1.Router)();
/**Routes main */
router_v1.get("/health", (_req, res) => {
    res.status(200).json(new success_response_1.SuccessResponse({ message: "api is working" }));
});
/** Authentication */
router_v1.use("/auth", auth_routes_1.default);
/** URL */
router_v1.use("/url", url_routes_1.default);
/**Analytics Routes */
router_v1.use("/analytic", analytics_routes_1.default);
/**Payment Routes */
router_v1.use("/payment", payment_routes_1.default);
exports.default = router_v1;
