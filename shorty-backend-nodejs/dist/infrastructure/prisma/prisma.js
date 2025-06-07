"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const env_config_1 = require("../../config/env_config");
const globalForPrisma = globalThis;
exports.prisma = globalForPrisma.prisma ||
    new client_1.PrismaClient({
        log: ['query', 'error', 'warn'],
    });
if (env_config_1.envConfig.env !== 'production')
    globalForPrisma.prisma = exports.prisma;
