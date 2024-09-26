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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let ReviewService = exports.ReviewService = class ReviewService {
    constructor(prismaService, redisService) {
        this.prismaService = prismaService;
        this.redisService = redisService;
    }
    async createReview(userId, productId, createReview, storeId) {
        const key = this.redisService.getRedisKeyForReviews(productId);
        const storeKey = this.redisService.getRedisKey(storeId);
        const order = await this.prismaService.orders.findFirst({
            where: {
                userId: userId,
                orderItems: {
                    some: {
                        productId: productId,
                    },
                },
            },
            select: {
                id: true,
            },
        });
        if (!order) {
            throw new common_1.ConflictException('You have not ordered this product.');
        }
        const existingReview = await this.prismaService.review.findFirst({
            where: {
                userId: userId,
                productId: productId,
            },
            select: {
                id: true,
            },
        });
        if (existingReview) {
            throw new common_1.ConflictException('You have already reviewed this product.');
        }
        const review = await this.prismaService.review.create({
            data: {
                rating: createReview.rating,
                comment: createReview.comment,
                userId: userId,
                productId: productId,
            },
            select: {
                id: true,
            },
        });
        const reviewImage = createReview.images.map((image) => (Object.assign(Object.assign({}, image), { rewiewId: review.id })));
        Promise.all([
            this.prismaService.reviewImage.createMany({
                data: reviewImage,
            }),
            this.redisService.deleteValue(key),
            this.redisService.deleteValue(storeKey),
            this.redisService.deleteValue('user-reviews'),
        ]);
        return review;
    }
    async checkIfUserIsEligibleToReview(userId, productId) {
        const order = await this.prismaService.orders.findFirst({
            where: {
                userId: userId,
                orderItems: {
                    some: {
                        productId: productId,
                    },
                },
            },
            select: {
                id: true,
            },
        });
        if (!order) {
            return false;
        }
        const existingReview = await this.prismaService.review.findFirst({
            where: {
                userId: userId,
                productId: productId,
            },
            select: {
                id: true,
            },
        });
        if (existingReview) {
            return false;
        }
        return true;
    }
    async getUserReviews(userId) {
        const getReviewsFromCache = await this.redisService.getValueFromList('user-reviews');
        if (getReviewsFromCache && getReviewsFromCache.length !== 0)
            return getReviewsFromCache;
        else {
            const reviews = await this.prismaService.review.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                    rating: true,
                    images: {
                        select: {
                            url: true,
                        },
                        take: 1,
                    },
                    comment: true,
                    createdAt: true,
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            Images: {
                                select: {
                                    url: true,
                                },
                                take: 1,
                            },
                        },
                    },
                },
            });
            await this.redisService.setValueToList('user-reviews', JSON.stringify(reviews));
            return reviews;
        }
    }
    async deleteReview(reviewId, userId, storeId) {
        const key = this.redisService.getRedisKeyForReviews(reviewId);
        const storeKey = this.redisService.getRedisKey(storeId);
        try {
            await this.prismaService.review.delete({
                where: {
                    id: reviewId,
                    userId: userId,
                },
            });
            Promise.all([
                this.redisService.deleteValue('user-reviews'),
                this.redisService.deleteValue(key),
                this.redisService.deleteValue(storeKey),
            ]);
            return 'Review deleted successfully.';
        }
        catch (error) {
            console.log(error);
            throw new common_1.ConflictException('Review not found.');
        }
    }
    async productReview(productId, page) {
        const take = 3;
        const skip = (page - 1) * take;
        this.redisService.setRedisKeyForReviews(productId, page, 3);
        const key = this.redisService.getRedisKeyForReviews(productId);
        const getReviewsFromCache = await this.redisService.getValueFromList(key);
        if (getReviewsFromCache && getReviewsFromCache.length !== 0) {
            return getReviewsFromCache;
        }
        else {
            const reviews = await this.prismaService.review.findMany({
                where: {
                    productId: productId,
                },
                select: {
                    id: true,
                    rating: true,
                    images: {
                        select: {
                            url: true,
                        },
                    },
                    comment: true,
                    createdAt: true,
                    user: {
                        select: {
                            displayName: true,
                            avatarUrl: true,
                        },
                    },
                },
                take: take,
                skip: skip,
            });
            if (!reviews.length) {
                throw new common_1.ConflictException('No reviews found.');
            }
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            await this.redisService.setValueToList(key, JSON.stringify({ reviews, averageRating }));
            return { reviews, averageRating };
        }
    }
};
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], ReviewService);
//# sourceMappingURL=review.service.js.map