export interface userType {
    userId: string;
    iat: number;
    exp: number;
}
export declare const User: (...dataOrPipes: any[]) => ParameterDecorator;
