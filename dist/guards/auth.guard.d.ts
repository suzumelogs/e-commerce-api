import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly prisma;
    constructor(reflector: Reflector, prisma: PrismaService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    matchRoles(roles: UserRole[], userId: string): Promise<boolean>;
}
