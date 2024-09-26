import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface CreateCategory {
    name: string;
    billboardId: string;
    gender: string;
    imageUrl: string;
}
export declare class CategoryService {
    private readonly prismaService;
    private readonly redisService;
    constructor(prismaService: PrismaService, redisService: RedisService);
    getAllCategories(storeId: string): Promise<string | {
        billboard: {
            id: string;
            label: string;
            imageUrl: string;
        };
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        imageUrl: string;
        gender: string;
    }[]>;
    getCategoryById(id: string): Promise<any>;
    createCategory(data: CreateCategory, storeId: string): Promise<{
        id: string;
    }>;
    updateCategory(id: string, data: CreateCategory): Promise<string>;
    deleteCategory(id: string): Promise<string>;
    getMenCategories(storeId: string): Promise<string | {
        billboard: {
            label: string;
        };
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        imageUrl: string;
    }[]>;
    getWomenCategories(storeId: string): Promise<string | {
        billboard: {
            label: string;
        };
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        imageUrl: string;
    }[]>;
}
export {};
