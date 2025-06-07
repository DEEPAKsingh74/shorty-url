import { prisma } from "@/infrastructure/prisma/prisma";
import { addDays } from "date-fns";

export const saveRefreshTokenService = async (token: string, userId: string) => {
    try {

        const expireAt = addDays(new Date(), 30);
        await prisma.refreshToken.create({
            data: {
                token: token,
                expireAt,
                userId
            }
        })

    } catch (error) {
        throw error;
    }
}