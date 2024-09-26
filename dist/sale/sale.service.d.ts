import { PrismaService } from 'src/prisma/prisma.service';
export declare class SaleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getSalesByStore(storeId: string): Promise<{
        total_sale: number;
        total_sale_today: number;
        total_sale_thisMonth: number;
        total_sale_thisYear: number;
        total_sale_thisWeek: number;
    }>;
}
