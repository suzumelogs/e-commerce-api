import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface CreateColor {
    name: string;
    value: string;
}
export declare class ColorService {
    private readonly prismaService;
    private readonly redisService;
    constructor(prismaService: PrismaService, redisService: RedisService);
    getAllColors(storeId: string): Promise<string | {
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        value: string;
    }[]>;
    getColorById(id: string): Promise<any>;
    createColor(data: CreateColor, storeId: string): Promise<{
        id: string;
    }>;
    updateColor(id: string, data: CreateColor): Promise<string>;
    deleteColor(id: string): Promise<string>;
}
export {};
