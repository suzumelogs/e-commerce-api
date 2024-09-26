import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface CreateBillboard {
    label: string;
    imageUrl: string;
}
export declare class BillboardService {
    private readonly prismaService;
    private readonly redisService;
    constructor(prismaService: PrismaService, redisService: RedisService);
    createBillboard(data: CreateBillboard, storeId: string): Promise<"Something went wrong" | {
        id: string;
    }>;
    getBillboardById(id: string): Promise<any>;
    updateBillboardById(id: string, data: CreateBillboard): Promise<string>;
    deleteBillboardById(id: string): Promise<string>;
    getAllBillboards(storeId: string): Promise<string | {
        id: string;
        createdAt: Date;
        label: string;
        imageUrl: string;
    }[]>;
    getBillboards(): Promise<string | {
        id: string;
        createdAt: Date;
        label: string;
        imageUrl: string;
    }[]>;
}
export {};
