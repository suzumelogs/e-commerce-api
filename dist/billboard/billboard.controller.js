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
exports.BillboardController = void 0;
const common_1 = require("@nestjs/common");
const billboard_service_1 = require("./billboard.service");
const role_decorator_1 = require("../decoratores/role.decorator");
const billboard_dto_1 = require("./dto/billboard.dto");
let BillboardController = exports.BillboardController = class BillboardController {
    constructor(billboardService) {
        this.billboardService = billboardService;
    }
    async getBillboards() {
        return await this.billboardService.getBillboards();
    }
    async createBillboard(id, data) {
        return await this.billboardService.createBillboard(data, id);
    }
    async getBillboardById(id) {
        return await this.billboardService.getBillboardById(id);
    }
    async updateBillboardById(id, data) {
        return await this.billboardService.updateBillboardById(id, data);
    }
    async findAllBillboards(storeId) {
        return await this.billboardService.getAllBillboards(storeId);
    }
    async deleteBillboardById(id) {
        return await this.billboardService.deleteBillboardById(id);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BillboardController.prototype, "getBillboards", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)(':storeId/create'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, billboard_dto_1.createBillboardDto]),
    __metadata("design:returntype", Promise)
], BillboardController.prototype, "createBillboard", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillboardController.prototype, "getBillboardById", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/update'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, billboard_dto_1.createBillboardDto]),
    __metadata("design:returntype", Promise)
], BillboardController.prototype, "updateBillboardById", null);
__decorate([
    (0, common_1.Get)(':storeId/all'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillboardController.prototype, "findAllBillboards", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BillboardController.prototype, "deleteBillboardById", null);
exports.BillboardController = BillboardController = __decorate([
    (0, common_1.Controller)('billboard'),
    __metadata("design:paramtypes", [billboard_service_1.BillboardService])
], BillboardController);
//# sourceMappingURL=billboard.controller.js.map