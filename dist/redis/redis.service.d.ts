interface Filters {
    price?: {
        gte?: number;
        lte?: number;
    };
    category?: {
        name: string;
    };
    isFeatured?: boolean;
}
export declare class RedisService {
    private readonly redisClient;
    private redisKeys;
    private redisKeysForReviews;
    constructor();
    deleteValue(key: string): Promise<void>;
    setValueToHash(key: string, hash: string, value: string): Promise<void>;
    getValueFromHash(key: string, hash: string): Promise<any>;
    setValueToList(key: string, value: string): Promise<void>;
    getValueFromList(key: string): Promise<string>;
    setValueAsString(key: string, value: string): Promise<void>;
    getValueAsString(key: string): Promise<string>;
    setResetpassword(key: string, value: string): Promise<void>;
    setRedisKey(storeId: string, filters: Filters, page: number, perPage: number): void;
    getRedisKey(storeId: string): string;
    setRedisKeyForReviews(productId: string, page: number, perPage: number): void;
    getRedisKeyForReviews(productId: string): string;
}
export {};
