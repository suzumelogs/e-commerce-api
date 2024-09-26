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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const role_decorator_1 = require("../decoratores/role.decorator");
const user_decrator_1 = require("../user/decorators/user.decrator");
let OrderController = exports.OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async getUserPendingOrders(user) {
        return await this.orderService.getUserPenddingOrders(user.userId);
    }
    async getUserDeliveredOrders(user) {
        return await this.orderService.getUserDeliveredOrders(user.userId);
    }
    async getAllOrders(storeId) {
        return await this.orderService.getAllOrders(storeId);
    }
    async getOrderById(id) {
        return await this.orderService.getOrderById(id);
    }
    async updateOrder(orderId, body) {
        return await this.orderService.updateOrder(orderId, body);
    }
    async deleteOrder(id) {
        return await this.orderService.deleteOrder(id);
    }
};
__decorate([
    (0, role_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Get)('pendings'),
    __param(0, (0, user_decrator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserPendingOrders", null);
__decorate([
    (0, role_decorator_1.Roles)('USER'),
    (0, common_1.Get)('delivered'),
    __param(0, (0, user_decrator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getUserDeliveredOrders", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':storeId/all'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrders", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderById", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/update'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "deleteOrder", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map