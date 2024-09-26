"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcrypt");
const redis_service_1 = require("../..//redis/redis.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async validateUserFromEmailPassword(email, password) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
                passwordHash: true,
                authType: true,
                displayName: true,
                userRole: true,
            },
        });
        if (!user)
            throw new common_1.ConflictException('User not found');
        else if (user && user.authType === 'EMAIL') {
            const doesPasswordMatch = await this.validatePassword(password, user.passwordHash);
            if (!doesPasswordMatch)
                throw new common_1.ConflictException('Something went wrong');
            const token = await this.generateJwtToken(user.id, user.displayName, user.userRole);
            return {
                access_token: token,
            };
        }
    }
    async signupWithEmailPassword(email, displayName, password) {
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (userExists)
            throw new common_1.ConflictException('Something went wrong');
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: email,
                displayName: displayName,
                passwordHash: passwordHash,
                authType: 'EMAIL',
            },
        });
        const token = await this.generateJwtToken(user.id, user.displayName, user.userRole);
        return {
            access_token: token,
        };
    }
    async generateJwtToken(userId, displayName, userRole) {
        return jwt.sign({ userId, displayName, userRole }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        });
    }
    async validatePassword(password, passwordHash) {
        return bcrypt.compare(password, passwordHash);
    }
    async currentUser(userId) {
        const Cacheduser = await this.redis.getValueFromHash(userId, 'user');
        if (Cacheduser) {
            return Cacheduser;
        }
        else {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                select: {
                    id: true,
                    displayName: true,
                    email: true,
                    userRole: true,
                    avatarUrl: true,
                },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            await this.redis.setValueToHash(userId, 'user', JSON.stringify(user));
            return user;
        }
    }
    async updateUserInfo(data, userId) {
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                displayName: data.displayName,
                email: data.email,
                avatarUrl: data.avaterUrl,
            },
        });
        await this.redis.deleteValue(userId);
        return 'Information updated successfully';
    }
    async resetPassword(body) {
        const keyfromRedis = await this.redis.getValueAsString(body.email);
        if (!keyfromRedis)
            throw new common_1.NotFoundException('Key not found');
        else if (keyfromRedis !== body.token)
            throw new common_1.ConflictException('Key not matched');
        const passwordHash = await bcrypt.hash(body.password, 10);
        const isUserExist = await this.isUserExist(body.email);
        if (!isUserExist)
            throw new common_1.NotFoundException('User not found');
        const user = await this.prisma.user.update({
            where: {
                email: body.email,
            },
            data: {
                passwordHash: passwordHash,
            },
        });
        await this.redis.deleteValue(user.id);
        return 'Password updated successfully';
    }
    async isUserExist(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
            },
        });
        if (user)
            return true;
        else
            return false;
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], AuthService);
//# sourceMappingURL=auth.service.js.map