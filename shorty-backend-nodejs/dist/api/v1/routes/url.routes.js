"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../../middleware/validator");
const success_response_1 = require("../../../utils/success_handler/success_response");
const express_1 = require("express");
const create_url_data_schema_1 = require("../lib/validator/url/create_url_data_schema");
const soft_auth_middleware_1 = require("../../../middleware/soft_auth_middleware");
const create_controller_1 = require("../controllers/url/create.controller");
const get_controller_1 = require("../controllers/url/get.controller");
const urlRoutes = (0, express_1.Router)();
/**Url routes */
urlRoutes.get("/health", (_req, res) => {
    res.status(200).json(new success_response_1.SuccessResponse({ data: "url route is working." }));
});
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
urlRoutes.post("/", (0, validator_1.validate)(create_url_data_schema_1.createUrlSchema), soft_auth_middleware_1.softAuthMiddleware, create_controller_1.createUrlController);
/** Get the url
 * GET -/ - redirect the request to the correct endpoint.
 * @param code: string
 */
urlRoutes.get("/:code", soft_auth_middleware_1.softAuthMiddleware, get_controller_1.getUrlController);
exports.default = urlRoutes;
