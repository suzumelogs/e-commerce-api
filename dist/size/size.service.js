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
exports.SizeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let SizeService = exports.SizeService = class SizeService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
    }
    async getAllSizes(storeId) {
        const sizesFromRedis = await this.redisService.getValueFromList('sizes');
        if (sizesFromRedis && sizesFromRedis.length !== 0)
            return sizesFromRedis;
        else {
            const sizes = await this.prismaService.size.findMany({
                where: {
                    storeId: storeId,
                },
                select: {
                    id: true,
                    name: true,
                    value: true,
                    storeId: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!sizes)
                throw new common_1.NotFoundException('Sizes not found');
            await this.redisService.setValueToList('sizes', JSON.stringify(sizes));
            return sizes;
        }
    }
    async getSizeById(id) {
        const sizeFromRedis = await this.redisService.getValueFromHash(id, 'size');
        if (sizeFromRedis)
            return sizeFromRedis;
        else {
            const size = await this.prismaService.size.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                    storeId: true,
                    value: true,
                },
            });
            if (!size)
                throw new common_1.NotFoundException('Size not found');
            await this.redisService.setValueToHash(id, 'size', JSON.stringify(size));
            return size;
        }
    }
    async createSize(data, storeId) {
        try {
            const size = await this.prismaService.size.create({
                data: {
                    name: data.name,
                    storeId: storeId,
                    value: data.value,
                },
                select: {
                    id: true,
                },
            });
            await this.redisService.deleteValue('sizes');
            return size;
        }
        catch (error) {
            return 'Size creation failed';
        }
    }
    async updateSize(id, data) {
        try {
            await this.prismaService.size.update({
                where: {
                    id: id,
                },
                data: {
                    name: data.name,
                    value: data.value,
                },
            });
            Promise.all([
                this.redisService.deleteValue('sizes'),
                this.redisService.deleteValue(id),
            ]);
            return 'Update size successfully';
        }
        catch (error) {
            return 'Store not found';
        }
    }
    async deleteSize(id) {
        try {
            await this.prismaService.size.delete({
                where: {
                    id: id,
                },
            });
            Promise.all([
                this.redisService.deleteValue('sizes'),
                this.redisService.deleteValue(id),
            ]);
            return 'Delete size successfully';
        }
        catch (error) {
            return 'Store not found';
        }
    }
};
exports.SizeService = SizeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], SizeService);
//# sourceMappingURL=size.service.js.map