import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/checkout.dto';
import { userType } from '../user/decorators/user.decrator';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    checkout(data: CreateCheckoutDto, user: userType, storeId: string): Promise<{
        id: string;
        url: string;
    }>;
}
