"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaService = exports.PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.isConnecting = false;
    }
    async onModuleInit() {
        await this.$connect();
        console.log('Prisma connected');
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
    async cleanDatabase() {
        return this.$transaction([
            this.orderItem.deleteMany(),
            this.orders.deleteMany(),
            this.review.deleteMany(),
            this.product.deleteMany(),
            this.color.deleteMany(),
            this.user.deleteMany(),
            this.category.deleteMany(),
            this.size.deleteMany(),
            this.store.deleteMany(),
        ]);
    }
};
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map