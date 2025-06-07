import { DeviceTypeEnum, ExpireTypeEnum, ExpireUnitEnum } from '@/types/url';
import { z } from 'zod';

export const DeviceTypeEnumSchema = z.nativeEnum(DeviceTypeEnum);
export const ExpiryTypeEnumSchema = z.nativeEnum(ExpireTypeEnum);
export const TimeUnitEnumSchema = z.nativeEnum(ExpireUnitEnum);

export const createUrlSchema = z.object({
    device_type: DeviceTypeEnumSchema,
    url: z.string().url({ message: "Invalid URL format" }),
    restricted_countries: z.array(z.string()).optional(),
    expire_data: z
        .object({
            type: ExpiryTypeEnumSchema.nullable().optional(),
            unit: TimeUnitEnumSchema.nullable().optional(),
            value: z.number().optional(),
        })
        .optional()
        .nullable()
        .transform((data) => {
            if (!data?.type) return null;

            return {
                type: data.type,
                unit: data.unit,
                value: data.value ?? null,
            };
        }),
    analytics: z.boolean(),
});

export type CreateUrl = z.infer<typeof createUrlSchema>;
