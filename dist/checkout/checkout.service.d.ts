import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface CreateCheckout {
    productIds: string[];
    quantity: number[];
    size: string[];
    color: string[];
}
export declare class CheckoutService {
    private readonly prismaService;
    private readonly redisService;
    private stripe;
    constructor(prismaService: PrismaService, redisService: RedisService);
    createCheckout(data: CreateCheckout, userId: string, storeId: string): Promise<{
        id: string;
        url: string;
    }>;
}
export {};
