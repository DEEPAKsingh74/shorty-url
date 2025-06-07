import { validate } from "@/middleware/validator";
import { SuccessResponse } from "@/utils/success_handler/success_response";
import { Request, Response, Router } from "express";
import { createUrlSchema } from "../lib/validator/url/create_url_data_schema";
import { softAuthMiddleware } from "@/middleware/soft_auth_middleware";
import { createUrlController } from "../controllers/url/create.controller";
import { getUrlController } from "../controllers/url/get.controller";
import { authMiddleware } from "@/middleware/auth.middleware";
import { deleteUrlController } from "../controllers/url/delete.controller";


const urlRoutes = Router();

/**Url routes */
urlRoutes.get("/health", (_req: Request, res: Response) => {
    res.status(200).json(new SuccessResponse({data: "url route is working."}));
})

/** Shortend a url
 * POST -/ -url_data_validation
 * @body url string
 * @body device_type "both" | "mobile" | "desktop"
 * @body expire_data : {
 *      @body type: "none" | "clicks" | "time"
 *      @body unit: "clicks" | "months" | "days" | "hours"
 *      @body value: number
 * }
 * @body restricted_countries string[]
 */
urlRoutes.post(
    "/",
    validate(createUrlSchema),
    softAuthMiddleware,
    createUrlController
)


/** Get the url
 * GET -/ - redirect the request to the correct endpoint.
 * @param code: string
 */
urlRoutes.get(
    "/:code",
    softAuthMiddleware,
    getUrlController
)


/** Delete the url
 * Delete -/ - 
 * @param id: string
 */
urlRoutes.delete(
    "/:id",
    authMiddleware,
    deleteUrlController
)

export default urlRoutes;