import { BillboardService } from './billboard.service';
import { createBillboardDto } from './dto/billboard.dto';
export declare class BillboardController {
    private readonly billboardService;
    constructor(billboardService: BillboardService);
    getBillboards(): Promise<string | {
        id: string;
        createdAt: Date;
        label: string;
        imageUrl: string;
    }[]>;
    createBillboard(id: string, data: createBillboardDto): Promise<"Something went wrong" | {
        id: string;
    }>;
    getBillboardById(id: string): Promise<any>;
    updateBillboardById(id: string, data: createBillboardDto): Promise<string>;
    findAllBillboards(storeId: string): Promise<string | {
        id: string;
        createdAt: Date;
        label: string;
        imageUrl: string;
    }[]>;
    deleteBillboardById(id: string): Promise<string>;
}
