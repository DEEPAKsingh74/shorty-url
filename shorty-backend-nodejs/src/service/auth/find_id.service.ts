import { toUserResponse } from "@/api/v1/core/mapper/user.mapper";
import { prisma } from "@/infrastructure/prisma/prisma";
import { UserResponse } from "@/types/index";

export const findUserService = async (userId: string): Promise<UserResponse | null> => {
    try {

        // check if user already exists.
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if(!existingUser) return null;

        return toUserResponse(existingUser);

    } catch (error) {
        throw error;
    }
}