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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
const store_dto_1 = require("./dto/store.dto");
const role_decorator_1 = require("../decoratores/role.decorator");
const user_decrator_1 = require("../user/decorators/user.decrator");
let StoreController = exports.StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    async createStore(body, user) {
        return await this.storeService.createStore(body, user.userId);
    }
    async getAllStore(user) {
        return await this.storeService.getAllStores(user.userId);
    }
    async getStoreById(id) {
        return await this.storeService.getStoreById(id);
    }
    async getStoreByUserId(user) {
        return await this.storeService.getStoreByUserId(user.userId);
    }
    async updateStore(id, body) {
        return await this.storeService.updateStore(id, body);
    }
    async deleteStore(id) {
        return await this.storeService.deleteStore(id);
    }
};
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decrator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.CreateStoreDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "createStore", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('all'),
    __param(0, (0, user_decrator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getAllStore", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStoreById", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(),
    __param(0, (0, user_decrator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStoreByUserId", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, store_dto_1.CreateStoreDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "updateStore", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "deleteStore", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map