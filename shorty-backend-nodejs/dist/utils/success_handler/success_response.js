"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    constructor({ data, message = "Success", statusCode = 200, meta }) {
        this.success = true;
        this.message = message;
        this.data = data;
        this.meta = meta;
        Object.defineProperty(this, "statusCode", {
            value: statusCode,
            enumerable: false,
        });
    }
    toJSON() {
        return {
            success: this.success,
            message: this.message,
            data: this.data ?? null,
            meta: this.meta ?? undefined,
        };
    }
}
exports.SuccessResponse = SuccessResponse;
