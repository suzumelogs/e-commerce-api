import { AuthService } from './auth.service';
import { LoginDTO, RestPasswordDTO, SingupDTO, UpdatePasswordDTO, UpdateUserDTO } from './dot/auth.dto';
import { userType } from '../decorators/user.decrator';
import { EmailService } from '../../email/email.service';
export declare class AuthController {
    private readonly authService;
    private readonly emailService;
    constructor(authService: AuthService, emailService: EmailService);
    me(user: userType): Promise<any>;
    login(body: LoginDTO): Promise<{
        access_token: string;
    }>;
    signup(body: SingupDTO): Promise<{
        access_token: string;
    }>;
    forgotPassword(body: RestPasswordDTO): Promise<string>;
    update(user: userType, body: UpdateUserDTO): Promise<string>;
    resetPassword(body: UpdatePasswordDTO): Promise<string>;
}
