import { PrismaClient } from "@prisma/client";

// Prisma Singleton
export const prisma = new PrismaClient({log: ['query', 'error']})

export type PrismaService = typeof prisma;