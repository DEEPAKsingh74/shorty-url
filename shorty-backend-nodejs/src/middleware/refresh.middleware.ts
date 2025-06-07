import { envConfig } from "@/config/env_config";
import { accessData } from "@/types/global";
import { UnauthorizedError } from "@/utils/error_handler/ErrorStatus";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const REFRESH_TOKEN_SECRET = envConfig.refresh_secret

export type refreshData = {
    userId: accessData['id'];
}

export interface AuthenticatedRefreshRequest extends Request {
    user?: refreshData
}

export const refreshMiddleware = (
    req: AuthenticatedRefreshRequest,
    _res: Response,
    next: NextFunction
) => {
    try {
        console.log("refresh middleware");
        
        // Get token from headers, cookies, or query params
        let token: string | undefined;

        // 1. From Authorization header
        const authHeader = req.headers.authorization;
        
        if (authHeader && authHeader.startsWith("Bearer rt ")) {
            console.log("auth header: ", authHeader);
            token = authHeader.split(" ")[2];
        }
        
        // 2. From cookies
        if (!token && req.cookies?.refresh_token) {
            console.log("auth header: ", req.cookies.refresh_token);
            token = req.cookies.refresh_token;
        }

        // 3. From query param
        if (!token && typeof req.query.refresh_token === "string") {
            token = req.query.refresh_token;
        }

        console.log(" refresh token: ", token);
        

        if (!token) {
            throw new UnauthorizedError("token not found");
        }

        // Verify token
        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as refreshData;
        req.user = decoded;

        next();
    } catch (error) {
        console.log("error refresh: ", error);
        
        next(error);
        return;
    }
};
