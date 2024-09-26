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
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = exports.RedisService = class RedisService {
    constructor() {
        this.redisKeys = {};
        this.redisKeysForReviews = {};
        this.redisClient = new ioredis_1.default(process.env.REDIS_URL);
        this.redisClient.on('connect', () => {
            console.log('Connected to Redis');
        });
        this.redisClient.on('error', (error) => {
            console.error('Redis error:', error);
        });
    }
    async deleteValue(key) {
        await this.redisClient.del(key);
    }
    async setValueToHash(key, hash, value) {
        await this.redisClient.hset(key, hash, value);
        this.redisClient.expire(key, 120 * 60);
    }
    async getValueFromHash(key, hash) {
        const serializedValue = await this.redisClient.hget(key, hash);
        if (serializedValue) {
            return JSON.parse(serializedValue);
        }
        else {
            return null;
        }
    }
    async setValueToList(key, value) {
        await this.redisClient.rpush(key, value);
        this.redisClient.expire(key, 120 * 60);
    }
    async getValueFromList(key) {
        const serializedValue = await this.redisClient.lrange(key, 0, -1);
        return serializedValue[0];
    }
    async setValueAsString(key, value) {
        await this.redisClient.set(key, value);
        this.redisClient.expire(key, 120 * 60);
    }
    async getValueAsString(key) {
        const serializedValue = await this.redisClient.get(key);
        return serializedValue;
    }
    async setResetpassword(key, value) {
        await this.redisClient.set(key, value);
        this.redisClient.expire(key, 60 * 2);
    }
    setRedisKey(storeId, filters, page, perPage) {
        this.redisKeys[storeId] = `products:${storeId}:${JSON.stringify(filters)}:${page}:${perPage}`;
    }
    getRedisKey(storeId) {
        return this.redisKeys[storeId] || '';
    }
    setRedisKeyForReviews(productId, page, perPage) {
        this.redisKeysForReviews[productId] = `reviews:${productId}:${page}:${perPage}`;
    }
    getRedisKeyForReviews(productId) {
        return this.redisKeysForReviews[productId] || '';
    }
};
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map