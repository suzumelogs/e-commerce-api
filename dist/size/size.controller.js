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
exports.SizeController = void 0;
const common_1 = require("@nestjs/common");
const size_service_1 = require("./size.service");
const role_decorator_1 = require("../decoratores/role.decorator");
const size_dto_1 = require("./dto/size.dto");
let SizeController = exports.SizeController = class SizeController {
    constructor(sizeService) {
        this.sizeService = sizeService;
    }
    async getAllSizes(storeId) {
        return await this.sizeService.getAllSizes(storeId);
    }
    async getSizeById(id) {
        return await this.sizeService.getSizeById(id);
    }
    async createSize(storeId, data) {
        return await this.sizeService.createSize(data, storeId);
    }
    async updateSizeById(id, data) {
        return await this.sizeService.updateSize(id, data);
    }
    async deleteSizeById(id) {
        return await this.sizeService.deleteSize(id);
    }
};
__decorate([
    (0, common_1.Get)(':storeId/all'),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "getAllSizes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "getSizeById", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)(':storeId/create'),
    __param(0, (0, common_1.Param)('storeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, size_dto_1.createSizeDto]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "createSize", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/update'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, size_dto_1.createSizeDto]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "updateSizeById", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SizeController.prototype, "deleteSizeById", null);
exports.SizeController = SizeController = __decorate([
    (0, common_1.Controller)('size'),
    __metadata("design:paramtypes", [size_service_1.SizeService])
], SizeController);
//# sourceMappingURL=size.controller.js.map