import { ColorService } from './color.service';
import { createColorDto } from './dto/color.dto';
export declare class ColorController {
    private readonly colorService;
    constructor(colorService: ColorService);
    getAllColors(storeId: string): Promise<string | {
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        value: string;
    }[]>;
    getColorById(id: string): Promise<any>;
    createColor(storeId: string, data: createColorDto): Promise<{
        id: string;
    }>;
    updateColorById(id: string, data: createColorDto): Promise<string>;
    deleteColorById(id: string): Promise<string>;
}
