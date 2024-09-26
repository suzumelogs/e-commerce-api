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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let CategoryService = exports.CategoryService = class CategoryService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
    }
    async getAllCategories(storeId) {
        const categoriesFromRedis = await this.redisService.getValueFromList('admincategories');
        if (categoriesFromRedis && categoriesFromRedis.length !== 0) {
            return categoriesFromRedis;
        }
        else {
            const categories = await this.prismaService.category.findMany({
                where: {
                    storeId: storeId,
                },
                select: {
                    id: true,
                    name: true,
                    storeId: true,
                    gender: true,
                    imageUrl: true,
                    billboard: {
                        select: {
                            id: true,
                            imageUrl: true,
                            label: true,
                        },
                    },
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (categories.length === 0)
                throw new common_1.NotFoundException('Categories not found');
            await this.redisService.setValueToList('admincategories', JSON.stringify(categories));
            return categories;
        }
    }
    async getCategoryById(id) {
        const categoryFromRedis = await this.redisService.getValueFromHash(id, 'category');
        if (categoryFromRedis)
            return categoryFromRedis;
        else {
            const category = await this.prismaService.category.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                    gender: true,
                    imageUrl: true,
                    storeId: true,
                    billboard: {
                        select: {
                            id: true,
                            label: true,
                            imageUrl: true,
                        },
                    },
                },
            });
            if (!category)
                throw new common_1.NotFoundException('Category not found');
            await this.redisService.setValueToHash(id, 'category', JSON.stringify(category));
            return category;
        }
    }
    async createCategory(data, storeId) {
        try {
            const category = await this.prismaService.category.create({
                data: {
                    name: data.name,
                    storeId: storeId,
                    billboardId: data.billboardId,
                    gender: data.gender,
                    imageUrl: data.imageUrl,
                },
                select: {
                    id: true,
                },
            });
            Promise.all([
                this.redisService.deleteValue('menCategories'),
                this.redisService.deleteValue('womenCategories'),
                this.redisService.deleteValue('admincategories'),
            ]);
            return category;
        }
        catch (error) {
            throw new Error('Category not created');
        }
    }
    async updateCategory(id, data) {
        try {
            await this.prismaService.category.update({
                where: {
                    id: id,
                },
                data: {
                    name: data.name,
                    gender: data.gender,
                    imageUrl: data.imageUrl,
                },
            });
            Promise.all([
                this.redisService.deleteValue('admincategories'),
                this.redisService.deleteValue('menCategories'),
                this.redisService.deleteValue('womenCategories'),
                this.redisService.deleteValue(id),
            ]);
            return 'Category updated';
        }
        catch (error) {
            throw new Error('Category not updated');
        }
    }
    async deleteCategory(id) {
        try {
            await this.prismaService.category.delete({
                where: {
                    id: id,
                },
            });
            Promise.all([
                this.redisService.deleteValue('admincategories'),
                this.redisService.deleteValue('menCategories'),
                this.redisService.deleteValue('womenCategories'),
                this.redisService.deleteValue(id),
            ]);
            return 'Category deleted';
        }
        catch (error) {
            throw new Error('Category not deleted');
        }
    }
    async getMenCategories(storeId) {
        const categoriesFromRedis = await this.redisService.getValueFromList('menCategories');
        if (categoriesFromRedis && categoriesFromRedis.length !== 0) {
            return categoriesFromRedis;
        }
        try {
            const categories = await this.prismaService.category.findMany({
                where: {
                    storeId,
                    gender: 'Male',
                },
                select: {
                    id: true,
                    name: true,
                    storeId: true,
                    imageUrl: true,
                    billboard: {
                        select: {
                            label: true,
                        },
                    },
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!categories)
                throw new common_1.NotFoundException('Categories not found');
            await this.redisService.setValueToList('menCategories', JSON.stringify(categories));
            return categories;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getWomenCategories(storeId) {
        const categoriesFromRedis = await this.redisService.getValueFromList('womenCategories');
        if (categoriesFromRedis && categoriesFromRedis.length !== 0) {
            return categoriesFromRedis;
        }
        try {
            const categories = await this.prismaService.category.findMany({
                where: {
                    storeId,
                    gender: 'Female',
                },
                select: {
                    id: true,
                    name: true,
                    storeId: true,
                    imageUrl: true,
                    billboard: {
                        select: {
                            label: true,
                        },
                    },
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!categories)
                throw new common_1.NotFoundException('Categories not found');
            await this.redisService.setValueToList('womenCategories', JSON.stringify(categories));
            return categories;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], CategoryService);
//# sourceMappingURL=category.service.js.map