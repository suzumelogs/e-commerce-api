import { RevenueService } from './revenue.service';
export declare class RevenueController {
    private readonly revenueService;
    constructor(revenueService: RevenueService);
    getRevenueOverview(storeId: string): Promise<{
        name: string;
        total: number;
    }[]>;
    getCurrentMonthRevenue(storeId: string): Promise<any>;
    getLastMonthRevenue(storeId: string): Promise<any>;
    getRevenueByStoreId(storeId: string): Promise<any>;
    getRevenueByStoreIdAndDate(storeId: string, dateString: string): Promise<number>;
}
