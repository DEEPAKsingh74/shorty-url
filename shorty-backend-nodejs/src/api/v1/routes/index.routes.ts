import { Request, Response, Router } from "express";
import { SuccessResponse } from "../../../utils/success_handler/success_response";
import authRoute from "./auth.routes";
import urlRoutes from "./url.routes";
import analyticRouter from "./analytics.routes";
import paymentRouter from "./payment.routes";

const router_v1 = Router();

/**Routes main */
router_v1.get("/health", (_req: Request, res: Response) => {
    res.status(200).json(new SuccessResponse({message: "api is working"}));
})

/** Authentication */
router_v1.use("/auth", authRoute);

/** URL */
router_v1.use("/url", urlRoutes);

/**Analytics Routes */
router_v1.use("/analytic", analyticRouter);

/**Payment Routes */
router_v1.use("/payment", paymentRouter);

export default router_v1;