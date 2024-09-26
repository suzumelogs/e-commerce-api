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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let OrderService = exports.OrderService = class OrderService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
    }
    async getAllOrders(storeId) {
        const cachedOrders = await this.redisService.getValueFromList('admin-orders');
        if (cachedOrders && cachedOrders.length !== 0)
            return cachedOrders;
        else {
            const orders = await this.prismaService.orders.findMany({
                where: {
                    storeId: storeId,
                },
                select: {
                    id: true,
                    isPaid: true,
                    isDelivered: true,
                    deliveredAt: true,
                    address: true,
                    phone: true,
                    createdAt: true,
                    orderItems: {
                        select: {
                            id: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                },
                            },
                            quantity: true,
                            size: true,
                            color: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!orders)
                throw new common_1.NotFoundException('Orders not found');
            await this.redisService.setValueToList('admin-orders', JSON.stringify(orders));
            return orders;
        }
    }
    async getOrderById(orderId) {
        const cachedOrder = await this.redisService.getValueFromHash(orderId, 'order');
        if (cachedOrder)
            return cachedOrder;
        else {
            const order = await this.prismaService.orders.findUnique({
                where: {
                    id: orderId,
                },
                select: {
                    id: true,
                    isDelivered: true,
                    deliveredAt: true,
                },
            });
            if (!order)
                throw new common_1.NotFoundException('Order not found');
            await this.redisService.setValueToHash(orderId, 'order', JSON.stringify(order));
            return order;
        }
    }
    async updateOrder(orderId, body) {
        await this.prismaService.orders.update({
            where: {
                id: orderId,
            },
            data: {
                isDelivered: body.isDelivered,
                deliveredAt: body.deliveredAt,
            },
        });
        await Promise.all([
            this.redisService.deleteValue('admin-orders'),
            this.redisService.deleteValue(orderId),
            this.redisService.deleteValue('pendding-orders'),
            this.redisService.deleteValue('delivered-orders'),
            this.redisService.deleteValue('total_revenue'),
            this.redisService.deleteValue('currentMonthRevenue'),
            this.redisService.deleteValue('previousMonthRevenue'),
        ]);
        return 'order updated successfully';
    }
    async getUserPenddingOrders(userId) {
        const getPenddingOrders = await this.redisService.getValueFromList('pendding-orders');
        if (getPenddingOrders && getPenddingOrders.length !== 0)
            return getPenddingOrders;
        const orders = await this.prismaService.orders.findMany({
            where: {
                userId: userId,
                isDelivered: false,
            },
            select: {
                id: true,
                createdAt: true,
                orderItems: {
                    select: {
                        id: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                Images: {
                                    select: {
                                        url: true,
                                    },
                                    take: 1,
                                },
                            },
                        },
                        quantity: true,
                        size: true,
                        color: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!orders)
            throw new common_1.NotFoundException('Orders not found');
        await this.redisService.setValueToList('pendding-orders', JSON.stringify(orders));
        return orders;
    }
    async getUserDeliveredOrders(userId) {
        const getDeliveredOrders = await this.redisService.getValueFromList('delivered-orders');
        if (getDeliveredOrders && getDeliveredOrders.length !== 0)
            return getDeliveredOrders;
        const orders = await this.prismaService.orders.findMany({
            where: {
                userId: userId,
                isDelivered: true,
            },
            select: {
                id: true,
                deliveredAt: true,
                orderItems: {
                    select: {
                        id: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                Images: {
                                    select: {
                                        url: true,
                                    },
                                    take: 1,
                                },
                            },
                        },
                        quantity: true,
                        size: true,
                        color: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        if (!orders)
            throw new common_1.NotFoundException('Orders not found');
        await this.redisService.setValueToList('delivered-orders', JSON.stringify(orders));
        return orders;
    }
    async deleteOrder(orderId) {
        try {
            await this.prismaService.orderItem.deleteMany({
                where: {
                    orderId: orderId,
                },
            }),
                await this.prismaService.orders.delete({
                    where: {
                        id: orderId,
                    },
                });
        }
        catch (error) {
            throw new common_1.BadRequestException('Order not found');
        }
        await Promise.all([
            this.redisService.deleteValue('admin-orders'),
            this.redisService.deleteValue(orderId),
            this.redisService.deleteValue('pendding-orders'),
            this.redisService.deleteValue('delivered-orders'),
            this.redisService.deleteValue('total_revenue'),
            this.redisService.deleteValue('currentMonthRevenue'),
            this.redisService.deleteValue('previousMonthRevenue'),
        ]);
        return 'order deleted successfully';
    }
};
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], OrderService);
//# sourceMappingURL=order.service.js.map