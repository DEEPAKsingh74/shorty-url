import { toUserResponse } from "@/api/v1/core/mapper/user.mapper";
import { AuthType } from "@prisma/client";
import { prisma } from "@/infrastructure/prisma/prisma";
import { UserData, UserResponse } from "@/types/index";
import { ConflictError } from "@/utils/error_handler/ErrorStatus";

export const saveUserService = async (user: UserData): Promise<UserResponse> => {
    try {

        // check if user already exists.
        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        });

        if(existingUser != null) throw new ConflictError("user already exists");

        const newUser = await prisma.user.create({
            data: {
                ...user,
                authType: AuthType.credentials
            }
        });

        return toUserResponse(newUser);

    } catch (error) {
        throw error;
    }
}