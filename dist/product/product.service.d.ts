import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface CreateProduct {
    name: string;
    price: string;
    categoryId: string;
    images: {
        url: string;
    }[];
    colors: {
        value: string;
    }[];
    sizes: {
        value: string;
    }[];
    description: string;
    isFeatured: boolean;
    isArchived: boolean;
}
interface Filters {
    price?: {
        gte?: number;
        lte?: number;
    };
    category?: {
        name: string;
    };
    isFeatured?: boolean;
}
export declare class ProductService {
    private readonly prismaService;
    private readonly redisService;
    constructor(prismaService: PrismaService, redisService: RedisService);
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
    createProduct(body: CreateProduct, storeId: string): Promise<{
        id: string;
    }>;
    updateProduct(id: string, body: CreateProduct, storeId: string): Promise<string>;
    deleteProductById(id: string, storeId: string): Promise<string>;
    searchProducts(query: string, page: number, limit: number): Promise<{
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
    }[] | "No products found">;
    filterProducts(storeId: string, filters: Filters, page: number, perPage: number): Promise<string | {
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
}
export {};
