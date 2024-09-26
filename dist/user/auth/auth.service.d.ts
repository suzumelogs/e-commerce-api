import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../..//redis/redis.service';
import { UpdateUserDTO } from './dot/auth.dto';
import { UserRole } from '@prisma/client';
interface RestPasswordBody {
    email: string;
    password: string;
    token: string;
}
export declare class AuthService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    validateUserFromEmailPassword(email: string, password: string): Promise<{
        access_token: string;
    }>;
    signupWithEmailPassword(email: string, displayName: string, password: string): Promise<{
        access_token: string;
    }>;
    generateJwtToken(userId: string, displayName: string, userRole: UserRole): Promise<string>;
    private validatePassword;
    currentUser(userId: string): Promise<any>;
    updateUserInfo(data: UpdateUserDTO, userId: string): Promise<string>;
    resetPassword(body: RestPasswordBody): Promise<string>;
    isUserExist(email: string): Promise<boolean>;
}
export {};
