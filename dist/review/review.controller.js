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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const role_decorator_1 = require("../decoratores/role.decorator");
const user_decrator_1 = require("../user/decorators/user.decrator");
const review_dto_1 = require("./dto/review.dto");
let ReviewController = exports.ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async createReview(productId, user, storeId, body) {
        return await this.reviewService.createReview(user.userId, productId, body, storeId);
    }
    async checkIfUserOrderedProduct(user, productId) {
        return await this.reviewService.checkIfUserIsEligibleToReview(user.userId, productId);
    }
    async getAllReviews(user) {
        return await this.reviewService.getUserReviews(user.userId);
    }
    async deleteReview(reviewId, storeId, user) {
        return await this.reviewService.deleteReview(reviewId, user.userId, storeId);
    }
    async getProductReviews(productId, page) {
        return await this.reviewService.productReview(productId, page);
    }
};
__decorate([
    (0, role_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Post)(':productId/:storeId/create'),
    __param(0, (0, common_1.Param)('productId', new common_1.ParseUUIDPipe())),
    __param(1, (0, user_decrator_1.User)()),
    __param(2, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "createReview", null);
__decorate([
    (0, role_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Get)(':productId/check'),
    __param(0, (0, user_decrator_1.User)()),
    __param(1, (0, common_1.Param)('productId', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "checkIfUserOrderedProduct", null);
__decorate([
    (0, role_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Get)(''),
    __param(0, (0, user_decrator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getAllReviews", null);
__decorate([
    (0, role_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Delete)(':id/delete/:storeId'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Param)('storeId', new common_1.ParseUUIDPipe())),
    __param(2, (0, user_decrator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Get)(':productId'),
    __param(0, (0, common_1.Param)('productId', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getProductReviews", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('review'),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map