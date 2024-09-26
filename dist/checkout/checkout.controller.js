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
exports.CheckoutController = void 0;
const common_1 = require("@nestjs/common");
const checkout_service_1 = require("./checkout.service");
const checkout_dto_1 = require("./dto/checkout.dto");
const user_decrator_1 = require("../user/decorators/user.decrator");
const role_decorator_1 = require("../decoratores/role.decorator");
let CheckoutController = exports.CheckoutController = class CheckoutController {
    constructor(checkoutService) {
        this.checkoutService = checkoutService;
    }
    async checkout(data, user, storeId) {
        return await this.checkoutService.createCheckout(data, user.userId, storeId);
    }
};
__decorate([
    (0, role_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Post)(':storeId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decrator_1.User)()),
    __param(2, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [checkout_dto_1.CreateCheckoutDto, Object, String]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "checkout", null);
exports.CheckoutController = CheckoutController = __decorate([
    (0, common_1.Controller)('checkout'),
    __metadata("design:paramtypes", [checkout_service_1.CheckoutService])
], CheckoutController);
//# sourceMappingURL=checkout.controller.js.map