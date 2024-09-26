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
exports.RevenueService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let RevenueService = exports.RevenueService = class RevenueService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async getRevenueByStoreId(storeId) {
        const redisRevenue = await this.redis.getValueAsString('totalRevenue');
        if (redisRevenue)
            return JSON.parse(redisRevenue);
        const revenue = await this.prisma.orders.findMany({
            where: {
                storeId,
                isPaid: true,
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                price: true,
                            },
                        },
                    },
                },
            },
        });
        const totalRevenue = revenue.reduce((total, order) => {
            const orderTotal = order.orderItems.reduce((orderSum, item) => {
                return orderSum + item.product.price.toNumber();
            }, 0);
            return total + orderTotal;
        }, 0);
        await this.redis.setValueAsString('totalRevenue', JSON.stringify(totalRevenue));
        return totalRevenue;
    }
    async getRevenueByStoreIdAndDate(storeId, date) {
        const dateObject = new Date(date);
        const startDate = new Date(dateObject);
        const endDate = new Date(dateObject);
        endDate.setHours(23, 59, 59, 999);
        try {
            if (endDate.toString() === 'Invalid Date' ||
                startDate.toString() === 'Invalid Date')
                return;
            const revenue = await this.prisma.orders.findMany({
                where: {
                    storeId,
                    isPaid: true,
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                include: {
                    orderItems: {
                        include: {
                            product: {
                                select: {
                                    price: true,
                                },
                            },
                        },
                    },
                },
            });
            const totalRevenue = revenue.reduce((total, order) => {
                const orderTotal = order.orderItems.reduce((orderSum, item) => {
                    return orderSum + item.product.price.toNumber();
                }, 0);
                return total + orderTotal;
            }, 0);
            return totalRevenue;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getCurrentMontRevenue(storeId) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const startDate = new Date(currentYear, currentMonth - 1, 1);
        const endDate = new Date(currentYear, currentMonth, 0);
        endDate.setHours(23, 59, 59, 999);
        const cachedRevenue = await this.redis.getValueAsString('currentMonthRevenue');
        if (cachedRevenue)
            return JSON.parse(cachedRevenue);
        else {
            const revenue = await this.prisma.orders.findMany({
                where: {
                    storeId,
                    isPaid: true,
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                include: {
                    orderItems: {
                        include: {
                            product: {
                                select: {
                                    price: true,
                                },
                            },
                        },
                    },
                },
            });
            const totalRevenue = revenue.reduce((total, order) => {
                const orderTotal = order.orderItems.reduce((orderSum, item) => {
                    return orderSum + item.product.price.toNumber();
                }, 0);
                return total + orderTotal;
            }, 0);
            await this.redis.setValueAsString('currentMonthRevenue', JSON.stringify(totalRevenue));
            return totalRevenue;
        }
    }
    async getPreviousMonthRevenue(storeId) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const startDate = new Date(currentYear, currentMonth - 1, 1);
        const endDate = new Date(currentYear, currentMonth, 0);
        endDate.setHours(23, 59, 59, 999);
        const cachedRevenue = await this.redis.getValueAsString('previousMonthRevenue');
        if (cachedRevenue)
            return JSON.parse(cachedRevenue);
        else {
            const revenue = await this.prisma.orders.findMany({
                where: {
                    storeId,
                    isPaid: true,
                    createdAt: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
                include: {
                    orderItems: {
                        include: {
                            product: {
                                select: {
                                    price: true,
                                },
                            },
                        },
                    },
                },
            });
            const totalRevenue = revenue.reduce((total, order) => {
                const orderTotal = order.orderItems.reduce((orderSum, item) => {
                    return orderSum + item.product.price.toNumber();
                }, 0);
                return total + orderTotal;
            }, 0);
            await this.redis.setValueAsString('previousMonthRevenue', JSON.stringify(totalRevenue));
            return totalRevenue;
        }
    }
    async graphRevenue(storeId) {
        const paidOrders = await this.prisma.orders.findMany({
            where: {
                storeId,
                isPaid: true,
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                price: true,
                            },
                        },
                    },
                },
            },
        });
        const monthlyRevenue = {};
        for (const order of paidOrders) {
            const month = order.createdAt.getMonth();
            let revenueForOrder = 0;
            for (const item of order.orderItems) {
                revenueForOrder += item.product.price.toNumber();
            }
            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForOrder;
        }
        const graphData = [
            { name: 'Jan', total: 0 },
            { name: 'Feb', total: 0 },
            { name: 'Mar', total: 0 },
            { name: 'Apr', total: 0 },
            { name: 'May', total: 0 },
            { name: 'Jun', total: 0 },
            { name: 'Jul', total: 0 },
            { name: 'Aug', total: 0 },
            { name: 'Sep', total: 0 },
            { name: 'Oct', total: 0 },
            { name: 'Nov', total: 0 },
            { name: 'Dec', total: 0 },
        ];
        for (const month in monthlyRevenue) {
            graphData[parseInt(month)].total = monthlyRevenue[parseInt(month)];
        }
        return graphData;
    }
};
exports.RevenueService = RevenueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], RevenueService);
//# sourceMappingURL=revenue.service.js.map