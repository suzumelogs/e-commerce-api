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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const mailgen = require("mailgen");
const redis_service_1 = require("../redis/redis.service");
let EmailService = exports.EmailService = class EmailService {
    constructor(redisService) {
        this.redisService = redisService;
        this.createTransporter();
    }
    async createTransporter() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_HOST,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    async sendEmail(email) {
        const key = await this.generateRandomToken();
        await this.redisService.setResetpassword(email, key);
        const mailgenerator = new mailgen({
            theme: 'default',
            product: {
                name: 'E-commerce',
                link: 'https://mailgen.js/',
            },
        });
        const response = {
            body: {
                name: email,
                intro: "You have received this Email because you've requested a password reset",
                action: {
                    instructions: 'To rest your password, please click here:',
                    button: {
                        color: '#22BC66',
                        text: 'Reset your password',
                        link: `https://e-commerce-ruby-two.vercel.app/resetpassword?validation=${key}`,
                    },
                },
                outro: "If you didn't request this Email, please ignore it. This password reset link is only valid for the next 2 minutes.",
            },
        };
        const sendEmail = mailgenerator.generate(response);
        const message = {
            from: process.env.EMAIL_HOST,
            to: email,
            subject: 'Reset Password',
            html: sendEmail,
        };
        await this.transporter
            .sendMail(message)
            .then(() => {
            console.log('Email sent successfully');
        })
            .catch((err) => {
            console.log(err);
        });
    }
    async generateRandomToken() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let token = '';
        for (let i = 0; i < 30; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters[randomIndex];
        }
        return token;
    }
};
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], EmailService);
//# sourceMappingURL=email.service.js.map