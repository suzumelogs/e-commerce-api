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
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let ColorService = exports.ColorService = class ColorService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
    }
    async getAllColors(storeId) {
        const colorsFromRedis = await this.redisService.getValueFromList('colors');
        if (colorsFromRedis && colorsFromRedis.length !== 0)
            return colorsFromRedis;
        else {
            const colors = await this.prismaService.color.findMany({
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
            if (!colors)
                throw new common_1.NotFoundException('Colors not found');
            await this.redisService.setValueToList('colors', JSON.stringify(colors));
            return colors;
        }
    }
    async getColorById(id) {
        const colorFromRedis = await this.redisService.getValueFromHash(id, 'color');
        if (colorFromRedis)
            return colorFromRedis;
        else {
            const color = await this.prismaService.color.findUnique({
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
            if (!color)
                throw new common_1.NotFoundException('Color not found');
            await this.redisService.setValueToHash(id, 'color', JSON.stringify(color));
            return color;
        }
    }
    async createColor(data, storeId) {
        try {
            const color = await this.prismaService.color.create({
                data: {
                    name: data.name,
                    storeId: storeId,
                    value: data.value,
                },
                select: {
                    id: true,
                },
            });
            await this.redisService.deleteValue('colors');
            return color;
        }
        catch (error) {
            throw new Error("Can't create color");
        }
    }
    async updateColor(id, data) {
        try {
            await this.prismaService.color.update({
                where: {
                    id: id,
                },
                data: {
                    name: data.name,
                    value: data.value,
                },
            });
            Promise.all([
                this.redisService.deleteValue(id),
                this.redisService.deleteValue('colors'),
            ]);
            return 'Update color successfully';
        }
        catch (error) {
            throw new Error("Can't update color");
        }
    }
    async deleteColor(id) {
        try {
            await this.prismaService.color.delete({
                where: {
                    id: id,
                },
            });
            await Promise.all([
                this.redisService.deleteValue(id),
                this.redisService.deleteValue('colors'),
            ]);
            return 'Delete color successfully';
        }
        catch (error) {
            throw new Error("Can't delete color");
        }
    }
};
exports.ColorService = ColorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], ColorService);
//# sourceMappingURL=color.service.js.map