import { PrismaClient } from '@prisma/client';
import { envConfig } from '@config/env_config';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (envConfig.env !== 'production') globalForPrisma.prisma = prisma;