import { User } from "@prisma/client";
import { UserResponse } from "@/types";

export const toUserResponse = (user: User): UserResponse => {
  return {
    id: user.id,
    first_name: user.firstName ?? "",
    last_name: user.firstName ?? "",
    email: user.email,
    created_at: user.createdAt.toISOString(),
  };
};
