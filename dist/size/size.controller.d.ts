import { SizeService } from './size.service';
import { createSizeDto } from './dto/size.dto';
export declare class SizeController {
    private readonly sizeService;
    constructor(sizeService: SizeService);
    getAllSizes(storeId: string): Promise<string | {
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        value: string;
    }[]>;
    getSizeById(id: string): Promise<any>;
    createSize(storeId: string, data: createSizeDto): Promise<"Size creation failed" | {
        id: string;
    }>;
    updateSizeById(id: string, data: createSizeDto): Promise<"Store not found" | "Update size successfully">;
    deleteSizeById(id: string): Promise<"Store not found" | "Delete size successfully">;
}
