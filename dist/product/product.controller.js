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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const role_decorator_1 = require("../decoratores/role.decorator");
const product_dto_1 = require("./dto/product.dto");
let ProductController = exports.ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async searchProduct(search_query, page) {
        return await this.productService.searchProducts(search_query, page, 12);
    }
    async filterProducts(storeId, page, category, minPrice, maxPrice, isFeatured) {
        const price = maxPrice || minPrice
            ? Object.assign(Object.assign({}, (minPrice && { gte: parseInt(minPrice) })), (maxPrice && { lte: parseInt(maxPrice) })) : undefined;
        const filters = Object.assign(Object.assign(Object.assign({}, (category && { category })), (price && { price })), (isFeatured && { isFeatured }));
        return await this.productService.filterProducts(storeId, filters, page, 12);
    }
    async getAllProducts(storeId) {
        return await this.productService.getAllProducts(storeId);
    }
    async getProductById(id) {
        return await this.productService.getProductById(id);
    }
    async createProduct(storeId, body) {
        return await this.productService.createProduct(body, storeId);
    }
    async deleteProduct(storeId, id) {
        return await this.productService.deleteProductById(id, storeId);
    }
    async updateProduct(id, storeId, data) {
        return await this.productService.updateProduct(id, data, storeId);
    }
};
__decorate([
    (0, common_1.Get)('result'),
    __param(0, (0, common_1.Query)('search_query')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "searchProduct", null);
__decorate([
    (0, common_1.Get)(':storeId/filter'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('minPrice')),
    __param(4, (0, common_1.Query)('maxPrice')),
    __param(5, (0, common_1.Query)('isFeatured')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "filterProducts", null);
__decorate([
    (0, common_1.Get)(':storeId/all'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)(':storeId/create'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_dto_1.createProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':storeId/:id'),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, role_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':storeId/:id/update'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, product_dto_1.createProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map