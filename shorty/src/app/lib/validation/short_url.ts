import { DeviceTypeEnum, ExpiryTypeEnum, TimeUnitEnum } from '@/types';
import { z } from 'zod';


// Zod Schemas for Enums
export const DeviceTypeEnumSchema = z.nativeEnum(DeviceTypeEnum);
export const ExpiryTypeEnumSchema = z.nativeEnum(ExpiryTypeEnum);
export const TimeUnitEnumSchema = z.nativeEnum(TimeUnitEnum);

export const shortUrlSchema = z.object({
    device_type: DeviceTypeEnumSchema,
    url: z.string().url(),
    restricted_countries: z.array(z.string()),
    expire_data: z.object({
        type: ExpiryTypeEnumSchema.nullable(),
        unit: TimeUnitEnumSchema.nullable(),
        value: z.number(),
    }),
    analytics: z.boolean(),
});

export type ShortUrlSchemaType = z.infer<typeof shortUrlSchema>;
