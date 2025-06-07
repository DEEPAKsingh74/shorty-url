import { envConfig } from "@/config/env_config";
import { accessData } from "@/types/global";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = envConfig.access_secret

export interface AuthenticatedRequest extends Request {
  user?: accessData;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from headers, cookies, or query params
    let token: string | undefined;

    console.log("inside auth middleware");
    

    // 1. From Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      console.log("headers");

      token = authHeader.split(" ")[1];
    }

    // 2. From cookies
    console.log("cookies req: ", req.cookies);
    
    if (!token && req.cookies?.access_token) {
      console.log("cookies");
      token = req.cookies.access_token;
    }

    // 3. From query param
    if (!token && typeof req.query.access_token === "string") {
      console.log("params");
      token = req.query.access_token;
    }

    if (!token) {
      res.status(401).json({ message: "Access token not found" });
      return;
    }

    console.log("Token auth: ", token);

    // Verify token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as accessData;
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
    return;
  }
};
