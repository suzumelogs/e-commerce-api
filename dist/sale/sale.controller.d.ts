import { SaleService } from './sale.service';
export declare class SaleController {
    private readonly saleService;
    constructor(saleService: SaleService);
    getSaleByStoreId(storeId: string): Promise<{
        total_sale: number;
        total_sale_today: number;
        total_sale_thisMonth: number;
        total_sale_thisYear: number;
        total_sale_thisWeek: number;
    }>;
}
