import { CreateCategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getMenCategories(storeId: string): Promise<string | {
        billboard: {
            label: string;
        };
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        imageUrl: string;
    }[]>;
    getWomwnCategories(storeId: string): Promise<string | {
        billboard: {
            label: string;
        };
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        imageUrl: string;
    }[]>;
    getAllCategories(storeId: string): Promise<string | {
        billboard: {
            id: string;
            label: string;
            imageUrl: string;
        };
        id: string;
        name: string;
        createdAt: Date;
        storeId: string;
        imageUrl: string;
        gender: string;
    }[]>;
    getCategoryById(id: string): Promise<any>;
    createCategory(storeId: string, data: CreateCategoryDto): Promise<{
        id: string;
    }>;
    updateCategoryById(id: string, data: CreateCategoryDto): Promise<string>;
    deleteCategoryById(id: string): Promise<string>;
}
