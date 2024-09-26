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
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const stripe_1 = require("stripe");
let CheckoutService = exports.CheckoutService = class CheckoutService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15',
            typescript: true,
        });
    }
    async createCheckout(data, userId, storeId) {
        try {
            const products = await this.prismaService.product.findMany({
                where: {
                    id: {
                        in: data.productIds,
                    },
                },
            });
            if (products.length === 0)
                throw new Error('No product found');
            const line_items = [];
            products.forEach((product) => {
                line_items.push({
                    quantity: data.quantity.find((quantity, index) => data.productIds[index] === product.id),
                    price_data: {
                        currency: 'BDT',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price.toNumber() * 100,
                    },
                });
            });
            const order = await this.prismaService.orders.create({
                data: {
                    storeId: storeId,
                    userId: userId,
                    isDelivered: false,
                    isPaid: false,
                    orderItems: {
                        create: data.productIds.map((productId) => ({
                            product: {
                                connect: {
                                    id: productId,
                                },
                            },
                            quantity: data.quantity.find((quantity, index) => {
                                return data.productIds[index] === productId;
                            }),
                            size: data.size.find((size, index) => {
                                return data.productIds[index] === productId;
                            }),
                            color: data.color.find((color, index) => {
                                return data.productIds[index] === productId;
                            }),
                        })),
                    },
                },
            });
            const session = await this.stripe.checkout.sessions.create({
                line_items,
                mode: 'payment',
                billing_address_collection: 'required',
                phone_number_collection: {
                    enabled: true,
                },
                success_url: `${process.env.DEV_CLIENT_URL}/cart?success=1`,
                cancel_url: `${process.env.DEV_CLIENT_URL}/cart?canceled=1`,
                metadata: {
                    orderId: order.id,
                },
            });
            await Promise.all([
                this.redisService.deleteValue('admin-orders'),
                this.redisService.deleteValue('pendding-orders'),
                this.redisService.deleteValue('delivered-orders'),
                this.redisService.deleteValue('total_revenue'),
                this.redisService.deleteValue('currentMonthRevenue'),
                this.redisService.deleteValue('previousMonthRevenue'),
            ]);
            return {
                id: session.id,
                url: session.url,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.CheckoutService = CheckoutService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], CheckoutService);
//# sourceMappingURL=checkout.service.js.map