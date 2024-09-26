import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private isConnecting;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    cleanDatabase(): Promise<[import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload, import(".prisma/client").Prisma.BatchPayload]>;
}
