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
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SaleService = exports.SaleService = class SaleService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSalesByStore(storeId) {
        const totalSales = await this.prisma.orders.count({
            where: {
                storeId: storeId,
                isPaid: true,
            },
        });
        const totalSalesToday = await this.prisma.orders.count({
            where: {
                storeId: storeId,
                isPaid: true,
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    lte: new Date(new Date().setHours(23, 59, 59, 999)),
                },
            },
        });
        const totalSalesThisMonth = await this.prisma.orders.count({
            where: {
                storeId: storeId,
                isPaid: true,
                createdAt: {
                    gte: new Date(new Date().setDate(1)),
                    lte: new Date(new Date().setDate(31)),
                },
            },
        });
        const totalSalesThisYear = await this.prisma.orders.count({
            where: {
                storeId: storeId,
                isPaid: true,
                createdAt: {
                    gte: new Date(new Date().setMonth(0)),
                    lte: new Date(new Date().setMonth(11)),
                },
            },
        });
        const totalSalesThisWeek = await this.prisma.orders.count({
            where: {
                storeId: storeId,
                isPaid: true,
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)),
                    lte: new Date(new Date().setDate(new Date().getDate() - 1)),
                },
            },
        });
        return {
            total_sale: totalSales,
            total_sale_today: totalSalesToday,
            total_sale_thisMonth: totalSalesThisMonth,
            total_sale_thisYear: totalSalesThisYear,
            total_sale_thisWeek: totalSalesThisWeek,
        };
    }
};
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaleService);
//# sourceMappingURL=sale.service.js.map