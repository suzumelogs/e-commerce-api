import { RedisService } from '../redis/redis.service';
export declare class EmailService {
    private transporter;
    private readonly redisService;
    constructor(redisService: RedisService);
    private createTransporter;
    sendEmail(email: string): Promise<void>;
    generateRandomToken(): Promise<string>;
}
