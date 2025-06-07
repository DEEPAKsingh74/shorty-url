import { toUserResponse } from "@/api/v1/core/mapper/user.mapper";
import { compareHash } from "@/api/v1/lib/helpers/becrypt_hash";
import { prisma } from "@/infrastructure/prisma/prisma";
import { UserData, UserResponse } from "@/types/index";
import { BadRequestError, NotFoundError } from "@/utils/error_handler/ErrorStatus";

export const loginUserService = async (user: UserData): Promise<UserResponse> => {
    try {

        // check if user already exists.
        const existingUser = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        });

        if(existingUser == null || existingUser.password == null) throw new NotFoundError("Invalid Credentials");

        if(!(await compareHash(user.password, existingUser.password))){
            throw new BadRequestError("Invalid Credentials")
        }
        return toUserResponse(existingUser);

    } catch (error) {
        throw error;
    }
}