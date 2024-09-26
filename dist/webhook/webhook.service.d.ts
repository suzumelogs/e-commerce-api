import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class WebhookService {
    private readonly prismaService;
    private readonly redisService;
    private stripe;
    constructor(prismaService: PrismaService, redisService: RedisService);
    webhook(body: any, signature: string): Promise<{
        received: boolean;
    }>;
}
