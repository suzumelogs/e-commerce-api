import { OrderService } from './order.service';
import { userType } from '../user/decorators/user.decrator';
interface orderUpadte {
    isDelivered: boolean;
    deliveredAt: string;
}
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getUserPendingOrders(user: userType): Promise<string | {
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
    getUserDeliveredOrders(user: userType): Promise<string | {
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
    getOrderById(id: string): Promise<any>;
    updateOrder(orderId: string, body: orderUpadte): Promise<string>;
    deleteOrder(id: string): Promise<string>;
}
export {};
