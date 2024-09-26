import { ProductService } from './product.service';
import { createProductDto } from './dto/product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    searchProduct(search_query: string, page: number): Promise<"No products found" | {
        category: {
            id: string;
            name: string;
        };
        id: string;
        name: string;
        rewiews: {
            rating: number;
        }[];
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
        isFeatured: boolean;
        isArchived: boolean;
        Images: {
            id: string;
            url: string;
        }[];
        Sizes: {
            id: string;
            value: string;
        }[];
        Colors: {
            id: string;
            value: string;
        }[];
    }[]>;
    filterProducts(storeId: string, page: number, category?: {
        name: string;
    }, minPrice?: string, maxPrice?: string, isFeatured?: boolean): Promise<string | {
        products: {
            category: {
                id: string;
                name: string;
            };
            id: string;
            name: string;
            rewiews: {
                rating: number;
            }[];
            price: import("@prisma/client/runtime/library").Decimal;
            description: string;
            isFeatured: boolean;
            isArchived: boolean;
            Images: {
                id: string;
                url: string;
            }[];
            Sizes: {
                id: string;
                value: string;
            }[];
            Colors: {
                id: string;
                value: string;
            }[];
        }[];
        pagination: {
            page: number;
            per_page: number;
            total: number;
            total_pages: number;
        };
    }>;
    getAllProducts(storeId: string): Promise<string | {
        category: {
            id: string;
            name: string;
        };
        id: string;
        name: string;
        createdAt: Date;
        price: import("@prisma/client/runtime/library").Decimal;
        description: string;
        isFeatured: boolean;
        isArchived: boolean;
        Images: {
            id: string;
            url: string;
        }[];
        Sizes: {
            value: string;
        }[];
        Colors: {
            value: string;
        }[];
    }[]>;
    getProductById(id: string): Promise<any>;
    createProduct(storeId: string, body: createProductDto): Promise<{
        id: string;
    }>;
    deleteProduct(storeId: string, id: string): Promise<string>;
    updateProduct(id: string, storeId: string, data: createProductDto): Promise<string>;
}
