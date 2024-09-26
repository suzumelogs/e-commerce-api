import { PrismaClient } from '@prisma/client';
export declare class DataBaseConnection {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    constructor();
    connectToDatabase(): Promise<void>;
}
