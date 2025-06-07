"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
const login_schema_1 = require("./login_schema");
exports.registerSchema = login_schema_1.loginSchema.extend({
    full_name: zod_1.z.string().min(3, 'Full name must be at least 3 characters long').optional(),
});
