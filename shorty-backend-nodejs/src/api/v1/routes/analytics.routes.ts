import { authMiddleware } from "@/middleware/auth.middleware";
import { Request, Response, Router } from "express";
import { getUrlCountController } from "../controllers/analytic/count_url.controller";
import { getUrlAnalyticsController } from "../controllers/analytic/get.controller";
import { getAllUrlsController } from "../controllers/analytic/get_url.controller";

const analyticRouter = Router();

analyticRouter.get("/health", (_req: Request, res: Response) => {
    res.status(200).json({message: "analytics is working"});
})

analyticRouter.get(
    "/",
    authMiddleware,
    getAllUrlsController
)


analyticRouter.get(
    "/count",
    authMiddleware,
    getUrlCountController
)

analyticRouter.get(
    "/:urlId",
    authMiddleware,
    getUrlAnalyticsController
)



export default analyticRouter;