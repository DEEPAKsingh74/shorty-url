import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import { errorHandler } from "@utils/error_handler/ErrorHandler";
import router_v1 from "@api_v1/routes/index.routes";
import { softAuthMiddleware } from "./middleware/soft_auth_middleware";
import { getUrlController } from "./api/v1/controllers/url/get.controller";
import cookieParser from "cookie-parser";
// import { CreatePricing } from "./types/pricing";
// import { createPricingService } from "./service/pricing/create.service";
// import { prisma } from "./infrastructure/prisma/prisma";
// import { countries } from "./utils/constants/country_code";

dotenv.config();

const app = express();
const server = http.createServer(app);


app.use(cors({
	origin: 'http://localhost:3000',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}));

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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



app.get("/health", (_req: Request, res: Response) => {
	res.json({ mess: "hello" })
})
app.use("/api/v1", router_v1);


/** Get the url
 * GET -/ - redirect the request to the correct endpoint.
 * @param code: string
 */
app.get(
	"/:code",
	softAuthMiddleware,
	getUrlController
)

app.use(errorHandler);

export default server;