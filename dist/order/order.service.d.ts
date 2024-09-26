import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
interface updateOrder {
    isDelivered: boolean;
    deliveredAt: string;
}
export declare class OrderService {
    private readonly prismaService;
    private readonly redisService;
    constructor(prismaService: PrismaService, redisService: RedisService);
    getAllOrders(storeId: string): Promise<string | {
        id: string;
        createdAt: Date;
        isPaid: boolean;
        isDelivered: boolean;
        phone: string;
        address: string;
        deliveredAt: Date;
        orderItems: {
            size: string;
            color: string;
            product: {
                id: string;
                name: string;
                price: import("@prisma/client/runtime/library").Decimal;
            };
            id: string;
            quantity: number;
        }[];
    }[]>;
    getOrderById(orderId: string): Promise<any>;
    updateOrder(orderId: string, body: updateOrder): Promise<string>;
    getUserPenddingOrders(userId: string): Promise<string | {
        id: string;
        createdAt: Date;
        orderItems: {
            size: string;
            color: string;
            product: {
                id: string;
                name: string;
                Images: {
                    url: string;
                }[];
            };
            id: string;
            quantity: number;
        }[];
    }[]>;
    getUserDeliveredOrders(userId: string): Promise<string | {
        id: string;
        deliveredAt: Date;
        orderItems: {
            size: string;
            color: string;
            product: {
                id: string;
                name: string;
                Images: {
                    url: string;
                }[];
            };
            id: string;
            quantity: number;
        }[];
    }[]>;
    deleteOrder(orderId: string): Promise<string>;
}
export {};
