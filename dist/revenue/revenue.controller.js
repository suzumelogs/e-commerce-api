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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueController = void 0;
const common_1 = require("@nestjs/common");
const revenue_service_1 = require("./revenue.service");
const role_decorator_1 = require("../decoratores/role.decorator");
let RevenueController = exports.RevenueController = class RevenueController {
    constructor(revenueService) {
        this.revenueService = revenueService;
    }
    async getRevenueOverview(storeId) {
        return await this.revenueService.graphRevenue(storeId);
    }
    async getCurrentMonthRevenue(storeId) {
        return await this.revenueService.getCurrentMontRevenue(storeId);
    }
    async getLastMonthRevenue(storeId) {
        return await this.revenueService.getPreviousMonthRevenue(storeId);
    }
    async getRevenueByStoreId(storeId) {
        return await this.revenueService.getRevenueByStoreId(storeId);
    }
    async getRevenueByStoreIdAndDate(storeId, dateString) {
        const date = new Date(dateString);
        return await this.revenueService.getRevenueByStoreIdAndDate(storeId, date);
    }
};
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':storeId/overview'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getRevenueOverview", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':storeId/current-month'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getCurrentMonthRevenue", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':storeId/last-month'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getLastMonthRevenue", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':storeId'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getRevenueByStoreId", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':storeId/:date'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getRevenueByStoreIdAndDate", null);
exports.RevenueController = RevenueController = __decorate([
    (0, common_1.Controller)('revenue'),
    __metadata("design:paramtypes", [revenue_service_1.RevenueService])
], RevenueController);
//# sourceMappingURL=revenue.controller.js.map