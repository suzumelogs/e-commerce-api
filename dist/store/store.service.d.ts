import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface CreateStore {
    name: string;
}
export declare class StoreService {
    private readonly Prisma;
    private readonly redis;
    constructor(Prisma: PrismaService, redis: RedisService);
    createStore(data: CreateStore, userId: string): Promise<{
        id: string;
    } | "Something went wrong">;
    getStoreById(id: string): Promise<any>;
    getStoreByUserId(userId: string): Promise<any>;
    getAllStores(userId: string): Promise<string | {
        id: string;
        name: string;
        userId: string;
    }[]>;
    updateStore(id: string, data: CreateStore): Promise<"Updated successfully" | "Can't update store">;
    deleteStore(id: string): Promise<string>;
}
export {};
