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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const stripe_1 = require("stripe");
let WebhookService = exports.WebhookService = class WebhookService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2022-11-15',
            typescript: true,
        });
    }
    async webhook(body, signature) {
        var _a, _b, _c;
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
        }
        catch (error) {
            console.log(error);
            throw new Error(`Webhook error: ${error.message}`);
        }
        const session = event.data.object;
        const address = (_a = session === null || session === void 0 ? void 0 : session.customer_details) === null || _a === void 0 ? void 0 : _a.address;
        const addressComponents = [
            address === null || address === void 0 ? void 0 : address.line1,
            address === null || address === void 0 ? void 0 : address.line2,
            address === null || address === void 0 ? void 0 : address.city,
            address === null || address === void 0 ? void 0 : address.state,
            address === null || address === void 0 ? void 0 : address.postal_code,
            address === null || address === void 0 ? void 0 : address.country,
        ];
        const addressString = addressComponents
            .filter((c) => c !== null)
            .join(', ');
        if (event.type === 'checkout.session.completed') {
            const order = await this.prismaService.orders.update({
                where: {
                    id: (_b = session === null || session === void 0 ? void 0 : session.metadata) === null || _b === void 0 ? void 0 : _b.orderId,
                },
                data: {
                    isPaid: true,
                    address: addressString,
                    phone: ((_c = session === null || session === void 0 ? void 0 : session.customer_details) === null || _c === void 0 ? void 0 : _c.phone) || '',
                },
                include: {
                    orderItems: true,
                },
            });
            await Promise.all([
                this.redisService.deleteValue('admin-orders'),
                this.redisService.deleteValue(order.id),
                this.redisService.deleteValue('pendding-orders'),
                this.redisService.deleteValue('delivered-orders'),
                this.redisService.deleteValue('total_revenue'),
                this.redisService.deleteValue('currentMonthRevenue'),
                this.redisService.deleteValue('previousMonthRevenue'),
            ]);
        }
        return { received: true };
    }
};
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map