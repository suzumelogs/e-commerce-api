type UserRole = 'ADMIN' | 'USER';
export declare class SingupDTO {
    email: string;
    displayName: string;
    password: string;
}
export declare class LoginDTO {
    email: string;
    password: string;
}
export declare class ResponseUserDTO {
    id: string;
    displayName: string;
    userRole: UserRole;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    constructor(partial: Partial<ResponseUserDTO>);
}
export declare class UpdateUserDTO {
    displayName: string;
    email: string;
    avaterUrl: string;
}
export declare class RestPasswordDTO {
    email: string;
}
export declare class UpdatePasswordDTO {
    email: string;
    password: string;
    token: string;
}
export {};
