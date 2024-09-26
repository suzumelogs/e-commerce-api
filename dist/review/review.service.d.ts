import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface CreateReview {
    rating: number;
    comment: string;
    images: {
        url: string;
    }[];
}
export declare class ReviewService {
    private readonly prismaService;
    private readonly redisService;
    constructor(prismaService: PrismaService, redisService: RedisService);
    createReview(userId: string, productId: string, createReview: CreateReview, storeId: string): Promise<{
        id: string;
    }>;
    checkIfUserIsEligibleToReview(userId: string, productId: string): Promise<boolean>;
    getUserReviews(userId: string): Promise<string | {
        product: {
            id: string;
            name: string;
            price: import("@prisma/client/runtime/library").Decimal;
            Images: {
                url: string;
            }[];
        };
        id: string;
        createdAt: Date;
        rating: number;
        comment: string;
        images: {
            url: string;
        }[];
    }[]>;
    deleteReview(reviewId: string, userId: string, storeId: string): Promise<string>;
    productReview(productId: string, page: number): Promise<string | {
        reviews: {
            user: {
                displayName: string;
                avatarUrl: string;
            };
            id: string;
            createdAt: Date;
            rating: number;
            comment: string;
            images: {
                url: string;
            }[];
        }[];
        averageRating: number;
    }>;
}
export {};
