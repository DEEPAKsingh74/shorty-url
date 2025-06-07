import { envConfig } from "@/config/env_config";
import { UnauthorizedError } from "@/utils/error_handler/ErrorStatus";
import jwt from "jsonwebtoken";



export const generateRefreshToken = (payload: { userId: string }): string => {
    return jwt.sign(payload, envConfig.refresh_secret, {
        expiresIn: "30d",
    });
};


export const verifyRefreshToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, envConfig.refresh_secret);
        return decoded;
    } catch (err) {
        throw new UnauthorizedError("Invalid or expired refresh token");
    }
};