"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const express_1 = require("express");
const count_url_controller_1 = require("../controllers/analytic/count_url.controller");
const get_controller_1 = require("../controllers/analytic/get.controller");
const get_url_controller_1 = require("../controllers/analytic/get_url.controller");
const analyticRouter = (0, express_1.Router)();
analyticRouter.get("/health", (_req, res) => {
    res.status(200).json({ message: "analytics is working" });
});
analyticRouter.get("/", auth_middleware_1.authMiddleware, get_url_controller_1.getAllUrlsController);
analyticRouter.get("/count", auth_middleware_1.authMiddleware, count_url_controller_1.getUrlCountController);
analyticRouter.get("/:urlId", auth_middleware_1.authMiddleware, get_controller_1.getUrlAnalyticsController);
exports.default = analyticRouter;
