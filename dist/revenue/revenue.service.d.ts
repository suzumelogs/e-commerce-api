import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class RevenueService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    getRevenueByStoreId(storeId: string): Promise<any>;
    getRevenueByStoreIdAndDate(storeId: string, date: Date): Promise<number>;
    getCurrentMontRevenue(storeId: string): Promise<any>;
    getPreviousMonthRevenue(storeId: string): Promise<any>;
    graphRevenue(storeId: string): Promise<{
        name: string;
        total: number;
    }[]>;
}
