"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_controller_1 = require("../controllers/auth/register.controller");
const register_scheme_1 = require("../lib/validator/auth/register_scheme");
const validator_1 = require("../../../middleware/validator");
const success_response_1 = require("../../../utils/success_handler/success_response");
const express_1 = require("express");
const login_schema_1 = require("../lib/validator/auth/login_schema");
const login_controller_1 = require("../controllers/auth/login.controller");
const me_controller_1 = require("../controllers/auth/me.controller");
const refresh_controller_1 = require("../controllers/auth/refresh.controller");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const refresh_middleware_1 = require("../../../middleware/refresh.middleware");
const authRoute = (0, express_1.Router)();
/**Health check route */
authRoute.get("/health", (_req, res) => {
    res.status(200).json(new success_response_1.SuccessResponse({ message: "auth is working" }));
});
/**Register route
 * POST -/register - register_validation
 * @body full_name?: string
 * @body email: string
 * @body password: string
 */
authRoute.post("/register", (0, validator_1.validate)(register_scheme_1.registerSchema), register_controller_1.registerController);
/**Login route
 * POST -/login - login_validation
 * @body email: string
 * @body password: string
 */
authRoute.post("/login", (0, validator_1.validate)(login_schema_1.loginSchema), login_controller_1.loginController);
/**Me route
 * GET -/me
 */
authRoute.get("/me", auth_middleware_1.authMiddleware, me_controller_1.meController);
/**Refresh token route
 * GET -/refresh
 */
authRoute.get("/refresh", refresh_middleware_1.refreshMiddleware, refresh_controller_1.refreshTokenController);
exports.default = authRoute;
