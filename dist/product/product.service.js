"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let ProductService = exports.ProductService = class ProductService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
    }
    async getAllProducts(storeId) {
        const productsFromRedis = await this.redisService.getValueFromList('admin-products');
        if (productsFromRedis && productsFromRedis.length !== 0)
            return productsFromRedis;
        else {
            const products = await this.prismaService.product.findMany({
                where: {
                    storeId: storeId,
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    description: true,
                    isArchived: true,
                    isFeatured: true,
                    createdAt: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    Images: {
                        select: {
                            id: true,
                            url: true,
                        },
                        take: 1,
                    },
                    Sizes: {
                        select: {
                            value: true,
                        },
                    },
                    Colors: {
                        select: {
                            value: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!products)
                throw new common_1.NotFoundException('Products not found');
            await this.redisService.setValueToList('admin-products', JSON.stringify(products));
            return products;
        }
    }
    async getProductById(id) {
        const productFromRedis = await this.redisService.getValueFromHash(id, 'product');
        if (productFromRedis)
            return productFromRedis;
        else {
            const product = await this.prismaService.product.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                    price: true,
                    storeId: true,
                    createdAt: true,
                    description: true,
                    isArchived: true,
                    isFeatured: true,
                    category: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    Images: {
                        select: {
                            id: true,
                            url: true,
                        },
                    },
                    Sizes: {
                        select: {
                            value: true,
                        },
                    },
                    Colors: {
                        select: {
                            value: true,
                        },
                    },
                },
            });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            await this.redisService.setValueToHash(id, 'product', JSON.stringify(product));
            return product;
        }
    }
    async createProduct(body, storeId) {
        const key = this.redisService.getRedisKey(storeId);
        try {
            const product = await this.prismaService.product.create({
                data: {
                    name: body.name,
                    price: body.price,
                    storeId: storeId,
                    categoryId: body.categoryId,
                    description: body.description,
                    isArchived: body.isArchived,
                    isFeatured: body.isFeatured,
                },
                select: {
                    id: true,
                },
            });
            const productImage = body.images.map((image) => (Object.assign(Object.assign({}, image), { productId: product.id })));
            const productColor = body.colors.map((color) => (Object.assign(Object.assign({}, color), { productId: product.id })));
            const productSize = body.sizes.map((size) => (Object.assign(Object.assign({}, size), { productId: product.id })));
            await Promise.all([
                this.prismaService.image.createMany({
                    data: productImage,
                }),
                this.prismaService.productColor.createMany({
                    data: productColor,
                }),
                this.prismaService.productSize.createMany({
                    data: productSize,
                }),
                this.redisService.deleteValue('admin-products'),
                this.redisService.deleteValue(key),
            ]);
            return product;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async updateProduct(id, body, storeId) {
        const key = this.redisService.getRedisKey(storeId);
        try {
            const product = await this.prismaService.product.update({
                where: {
                    id: id,
                },
                data: {
                    name: body.name,
                    price: body.price,
                    categoryId: body.categoryId,
                    description: body.description,
                    isArchived: body.isArchived,
                    isFeatured: body.isFeatured,
                },
            });
            const productColor = body.colors.map((color) => (Object.assign(Object.assign({}, color), { productId: product.id })));
            const productSize = body.sizes.map((size) => (Object.assign(Object.assign({}, size), { productId: product.id })));
            await Promise.all([
                this.prismaService.productColor.deleteMany({
                    where: {
                        productId: productColor[0].productId,
                    },
                }),
                this.prismaService.productSize.deleteMany({
                    where: {
                        productId: productSize[0].productId,
                    },
                }),
                this.prismaService.productColor.createMany({
                    data: productColor,
                }),
                this.prismaService.productSize.createMany({
                    data: productSize,
                }),
                this.redisService.deleteValue(id),
                this.redisService.deleteValue('admin-products'),
                this.redisService.deleteValue(key),
            ]);
            return 'Product updated successfully';
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteProductById(id, storeId) {
        const key = this.redisService.getRedisKey(storeId);
        try {
            await this.prismaService.product.delete({
                where: {
                    id: id,
                },
            });
            await Promise.all([
                this.redisService.deleteValue(id),
                this.redisService.deleteValue('admin-products'),
                this.redisService.deleteValue(key),
            ]);
            return 'Product deleted successfully';
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async searchProducts(query, page, limit) {
        const skip = (page - 1) * limit;
        const take = parseInt(`${limit}`);
        const products = await this.prismaService.product.findMany({
            where: {
                name: {
                    search: query,
                },
                description: {
                    search: query,
                },
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                isArchived: true,
                isFeatured: true,
                Images: {
                    select: {
                        id: true,
                        url: true,
                    },
                    take: 1,
                },
                Sizes: {
                    select: {
                        id: true,
                        value: true,
                    },
                },
                Colors: {
                    select: {
                        id: true,
                        value: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                rewiews: {
                    select: {
                        rating: true,
                    },
                },
            },
            skip,
            take,
        });
        if (!products)
            return 'No products found';
        return products;
    }
    async filterProducts(storeId, filters, page, perPage) {
        const skip = (page - 1) * perPage;
        const take = parseInt(`${perPage}`);
        this.redisService.setRedisKey(storeId, filters, page, perPage);
        const key = this.redisService.getRedisKey(storeId);
        try {
            const total = await this.prismaService.product.count({
                where: Object.assign({ storeId: storeId }, filters),
            });
            const totalPages = Math.ceil(total / perPage);
            const cachedProducts = await this.redisService.getValueFromList(key);
            if (cachedProducts && cachedProducts.length !== 0) {
                return cachedProducts;
            }
            else {
                const products = await this.prismaService.product.findMany({
                    where: Object.assign({ storeId: storeId }, filters),
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        description: true,
                        isArchived: true,
                        isFeatured: true,
                        rewiews: {
                            select: {
                                rating: true,
                            },
                        },
                        Images: {
                            select: {
                                id: true,
                                url: true,
                            },
                            take: 1,
                        },
                        Sizes: {
                            select: {
                                id: true,
                                value: true,
                            },
                        },
                        Colors: {
                            select: {
                                id: true,
                                value: true,
                            },
                        },
                        category: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                    skip: skip,
                    take: take,
                });
                if (!products)
                    throw new common_1.NotFoundException('No products found');
                const pagination = {
                    page,
                    per_page: perPage,
                    total,
                    total_pages: totalPages,
                };
                await this.redisService.setValueToList(key, JSON.stringify({ products, pagination }));
                return { products, pagination };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], ProductService);
//# sourceMappingURL=product.service.js.map