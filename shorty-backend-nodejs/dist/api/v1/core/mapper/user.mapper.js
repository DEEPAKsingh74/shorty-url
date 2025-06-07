"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = void 0;
const toUserResponse = (user) => {
    return {
        id: user.id,
        first_name: user.firstName ?? "",
        last_name: user.firstName ?? "",
        email: user.email,
        created_at: user.createdAt.toISOString(),
    };
};
exports.toUserResponse = toUserResponse;
