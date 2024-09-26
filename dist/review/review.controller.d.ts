import { ReviewService } from './review.service';
import { userType } from '../user/decorators/user.decrator';
import { CreateReviewDto } from './dto/review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    createReview(productId: string, user: userType, storeId: string, body: CreateReviewDto): Promise<{
        id: string;
    }>;
    checkIfUserOrderedProduct(user: userType, productId: string): Promise<boolean>;
    getAllReviews(user: userType): Promise<string | {
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
    deleteReview(reviewId: string, storeId: string, user: userType): Promise<string>;
    getProductReviews(productId: string, page: number): Promise<string | {
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
