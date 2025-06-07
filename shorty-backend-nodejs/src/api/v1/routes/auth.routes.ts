import { registerController } from "@api_v1/controllers/auth/register.controller";
import { registerSchema } from "@api_v1/lib/validator/auth/register_scheme";
import { validate } from "@middleware/validator";
import { SuccessResponse } from "@utils/success_handler/success_response";
import { Request, Response, Router } from "express";
import { loginSchema } from "../lib/validator/auth/login_schema";
import { loginController } from "../controllers/auth/login.controller";
import { meController } from "../controllers/auth/me.controller";
import { refreshTokenController } from "../controllers/auth/refresh.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { refreshMiddleware } from "@/middleware/refresh.middleware";

const authRoute = Router();


/**Health check route */
authRoute.get("/health", (_req: Request, res: Response) => {
    res.status(200).json(new SuccessResponse({ message: "auth is working" }));
});

/**Register route
 * POST -/register - register_validation
 * @body full_name?: string
 * @body email: string
 * @body password: string
 */

authRoute.post(
    "/register",
    validate(registerSchema),
    registerController
)


/**Login route
 * POST -/login - login_validation
 * @body email: string
 * @body password: string
 */

authRoute.post(
    "/login",
    validate(loginSchema),
    loginController
)

/**Me route
 * GET -/me
 */

authRoute.get(
    "/me",
    authMiddleware,
    meController
)

/**Refresh token route
 * GET -/refresh
 */

authRoute.get(
    "/refresh",
    refreshMiddleware,
    refreshTokenController
)

export default authRoute;