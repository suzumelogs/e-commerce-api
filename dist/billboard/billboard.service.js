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
exports.BillboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let BillboardService = exports.BillboardService = class BillboardService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
    }
    async createBillboard(data, storeId) {
        try {
            const billboard = await this.prismaService.billboard.create({
                data: {
                    label: data.label,
                    imageUrl: data.imageUrl,
                    storeId: storeId,
                },
                select: {
                    id: true,
                },
            });
            Promise.all([
                this.redisService.deleteValue('billboards'),
                this.redisService.deleteValue('usersbillboard'),
            ]);
            return billboard;
        }
        catch (error) {
            return 'Something went wrong';
        }
    }
    async getBillboardById(id) {
        const billboardFromRedis = await this.redisService.getValueFromHash(id, 'billboard');
        if (billboardFromRedis)
            return billboardFromRedis;
        else {
            const billboard = await this.prismaService.billboard.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    label: true,
                    imageUrl: true,
                },
            });
            if (!billboard)
                throw new common_1.NotFoundException('Billboard not found');
            await this.redisService.setValueToHash(id, 'billboard', JSON.stringify(billboard));
            return billboard;
        }
    }
    async updateBillboardById(id, data) {
        try {
            await this.prismaService.billboard.update({
                where: {
                    id: id,
                },
                data: {
                    label: data.label,
                    imageUrl: data.imageUrl,
                },
            });
            Promise.all([
                this.redisService.deleteValue(id),
                this.redisService.deleteValue('billboards'),
                this.redisService.deleteValue('usersbillboard'),
            ]);
            return 'updated successfully';
        }
        catch (error) {
            throw new Error("Can't update billboard");
        }
    }
    async deleteBillboardById(id) {
        try {
            await this.prismaService.billboard.delete({
                where: {
                    id: id,
                },
            });
            Promise.all([
                this.redisService.deleteValue(id),
                this.redisService.deleteValue('billboards'),
                this.redisService.deleteValue('usersbillboard'),
            ]);
            return 'deleted successfully';
        }
        catch (error) {
            throw new Error("Can't delete billboard");
        }
    }
    async getAllBillboards(storeId) {
        const billboardsFromRedis = await this.redisService.getValueFromList('billboards');
        if (billboardsFromRedis && billboardsFromRedis.length !== 0)
            return billboardsFromRedis;
        const billboards = await this.prismaService.billboard.findMany({
            where: {
                storeId: storeId,
            },
            select: {
                id: true,
                label: true,
                imageUrl: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!billboards || billboards.length === 0) {
            throw new common_1.NotFoundException('Billboards not found');
        }
        await this.redisService.setValueToList('billboards', JSON.stringify(billboards));
        return billboards;
    }
    async getBillboards() {
        const billboardsFromRedis = await this.redisService.getValueFromList('usersbillboard');
        if (billboardsFromRedis && billboardsFromRedis.length !== 0)
            return billboardsFromRedis;
        else {
            const billboards = await this.prismaService.billboard.findMany({
                select: {
                    id: true,
                    label: true,
                    imageUrl: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!billboards || billboards.length === 0) {
                throw new common_1.NotFoundException('Billboards not found');
            }
            await this.redisService.setValueToList('usersbillboard', JSON.stringify(billboards));
            return billboards;
        }
    }
};
exports.BillboardService = BillboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], BillboardService);
//# sourceMappingURL=billboard.service.js.map