"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const ErrorHandler_1 = require("./utils/error_handler/ErrorHandler");
const index_routes_1 = __importDefault(require("./api/v1/routes/index.routes"));
const soft_auth_middleware_1 = require("./middleware/soft_auth_middleware");
const get_controller_1 = require("./api/v1/controllers/url/get.controller");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { CreatePricing } from "./types/pricing";
// import { createPricingService } from "./service/pricing/create.service";
// import { prisma } from "./infrastructure/prisma/prisma";
// import { countries } from "./utils/constants/country_code";
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// const pricingData: CreatePricing = {
// 	userId: "1fb586ec-9a78-4aef-851d-acd4e6161346",
// 	totalUrls: 5,
// 	isActive: true
// };
// (async () => {
// 	try {
// 		console.log("Running the create pricing...");
// 		const result = await createPricingService(pricingData);
// 		console.log("Create Pricing Result:", result);
// 	} catch (error) {
// 		console.error("Error while creating pricing:", error);
// 	}
// })();
// (async () => {
// 	try {
// 		const res = await prisma.country.createMany({
// 			data: countries,
// 			skipDuplicates: true,
// 		});
// 		console.log("data inserted country codes...", res);
// 	} catch (error) {
// 		console.log(error);
// 	}
// })();
app.get("/health", (_req, res) => {
    res.json({ mess: "hello" });
});
app.use("/api/v1", index_routes_1.default);
/** Get the url
 * GET -/ - redirect the request to the correct endpoint.
 * @param code: string
 */
app.get("/:code", soft_auth_middleware_1.softAuthMiddleware, get_controller_1.getUrlController);
app.use(ErrorHandler_1.errorHandler);
exports.default = server;
