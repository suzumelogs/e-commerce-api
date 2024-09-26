import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface CreateSize {
    name: string;
    value: string;
}
export declare class SizeService {
    private readonly prismaService;
    private readonly redisService;
    constructor(prismaService: PrismaService, redisService: RedisService);
    getAllSizes(storeId: string): Promise<string | {
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        value: string;
    }[]>;
    getSizeById(id: string): Promise<any>;
    createSize(data: CreateSize, storeId: string): Promise<{
        id: string;
    } | "Size creation failed">;
    updateSize(id: string, data: CreateSize): Promise<"Store not found" | "Update size successfully">;
    deleteSize(id: string): Promise<"Store not found" | "Delete size successfully">;
}
export {};
