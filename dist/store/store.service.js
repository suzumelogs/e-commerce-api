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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let StoreService = exports.StoreService = class StoreService {
    constructor(Prisma, redis) {
        this.Prisma = Prisma;
        this.redis = redis;
    }
    async createStore(data, userId) {
        try {
            const store = await this.Prisma.store.create({
                data: {
                    name: data.name,
                    userId: userId,
                },
                select: {
                    id: true,
                },
            });
            Promise.all([
                this.redis.deleteValue('userFirstStore'),
                this.redis.deleteValue('stores'),
            ]);
            return store;
        }
        catch (error) {
            return 'Something went wrong';
        }
    }
    async getStoreById(id) {
        const storeFromRedis = await this.redis.getValueFromHash(id, 'store');
        if (storeFromRedis)
            return storeFromRedis;
        else {
            const store = await this.Prisma.store.findFirst({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                    userId: true,
                },
            });
            if (!store)
                throw new common_1.NotFoundException('Store not found');
            await this.redis.setValueToHash(id, 'store', JSON.stringify(store));
            return store;
        }
    }
    async getStoreByUserId(userId) {
        const storeFromRedis = await this.redis.getValueFromHash('userFirstStore', 'userStore');
        if (storeFromRedis)
            return storeFromRedis;
        const store = await this.Prisma.store.findFirst({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                userId: true,
                name: true,
            },
        });
        if (!store)
            throw new common_1.NotFoundException('Store not found');
        await this.redis.setValueToHash('userFirstStore', 'userStore', JSON.stringify(store));
        return store;
    }
    async getAllStores(userId) {
        const storesFromRedis = await this.redis.getValueFromList('stores');
        if (storesFromRedis && storesFromRedis.length !== 0)
            return storesFromRedis;
        else {
            const store = await this.Prisma.store.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                    name: true,
                    userId: true,
                },
            });
            if (!store.length)
                throw new common_1.NotFoundException('Stores not found');
            await this.redis.setValueToList('stores', JSON.stringify(store));
            return store;
        }
    }
    async updateStore(id, data) {
        try {
            await this.Prisma.store.update({
                where: {
                    id: id,
                },
                data: {
                    name: data.name,
                },
            });
            Promise.all([
                this.redis.deleteValue(id),
                this.redis.deleteValue('userFirstStore'),
                this.redis.deleteValue('stores'),
            ]);
            return 'Updated successfully';
        }
        catch (error) {
            return "Can't update store";
        }
    }
    async deleteStore(id) {
        try {
            await this.Prisma.store.delete({
                where: {
                    id: id,
                },
            });
            Promise.all([
                this.redis.deleteValue(id),
                this.redis.deleteValue('stores'),
            ]);
            return 'Deleted successfully';
        }
        catch (error) {
            throw new common_1.NotFoundException(error.message);
        }
    }
};
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], StoreService);
//# sourceMappingURL=store.service.js.map