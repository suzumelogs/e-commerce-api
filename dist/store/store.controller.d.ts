import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/store.dto';
import { userType } from '../user/decorators/user.decrator';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    createStore(body: CreateStoreDto, user: userType): Promise<"Something went wrong" | {
        id: string;
    }>;
    getAllStore(user: userType): Promise<string | {
        id: string;
        name: string;
        userId: string;
    }[]>;
    getStoreById(id: string): Promise<any>;
    getStoreByUserId(user: userType): Promise<any>;
    updateStore(id: string, body: CreateStoreDto): Promise<"Updated successfully" | "Can't update store">;
    deleteStore(id: string): Promise<string>;
}
