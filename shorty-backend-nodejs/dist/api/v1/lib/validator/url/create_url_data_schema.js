"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUrlSchema = exports.TimeUnitEnumSchema = exports.ExpiryTypeEnumSchema = exports.DeviceTypeEnumSchema = void 0;
const url_1 = require("../../../../../types/url");
const zod_1 = require("zod");
exports.DeviceTypeEnumSchema = zod_1.z.nativeEnum(url_1.DeviceTypeEnum);
exports.ExpiryTypeEnumSchema = zod_1.z.nativeEnum(url_1.ExpireTypeEnum);
exports.TimeUnitEnumSchema = zod_1.z.nativeEnum(url_1.ExpireUnitEnum);
exports.createUrlSchema = zod_1.z.object({
    device_type: exports.DeviceTypeEnumSchema,
    url: zod_1.z.string().url({ message: "Invalid URL format" }),
    restricted_countries: zod_1.z.array(zod_1.z.string()).optional(),
    expire_data: zod_1.z
        .object({
        type: exports.ExpiryTypeEnumSchema.nullable().optional(),
        unit: exports.TimeUnitEnumSchema.nullable().optional(),
        value: zod_1.z.number().optional(),
    })
        .optional()
        .nullable()
        .transform((data) => {
        if (!data?.type)
            return null;
        return {
            type: data.type,
            unit: data.unit,
            value: data.value ?? null,
        };
    }),
    analytics: zod_1.z.boolean(),
});
