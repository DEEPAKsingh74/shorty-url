import { envConfig } from "@/config/env_config";
import { accessData } from "@/types/global";
import { UnauthorizedError } from "@/utils/error_handler/ErrorStatus";
import jwt from "jsonwebtoken";


export const generateAccessToken = (payload: accessData): string => {
    return jwt.sign(payload, envConfig.access_secret, {
        expiresIn: "1d",
    });
};


export const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, envConfig.access_secret);
        return decoded;
    } catch (err) {
        if(err instanceof jwt.TokenExpiredError){
            throw new UnauthorizedError("Token expired");
        }

        throw err;
    }
};