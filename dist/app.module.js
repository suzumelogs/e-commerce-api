"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const store_module_1 = require("./store/store.module");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const passport_1 = require("@nestjs/passport");
const core_1 = require("@nestjs/core");
const user_inteceptor_1 = require("./user/intercepters/user.inteceptor");
const auth_guard_1 = require("./guards/auth.guard");
const redis_module_1 = require("./redis/redis.module");
const billboard_module_1 = require("./billboard/billboard.module");
const category_module_1 = require("./category/category.module");
const size_module_1 = require("./size/size.module");
const color_module_1 = require("./color/color.module");
const product_module_1 = require("./product/product.module");
const order_module_1 = require("./order/order.module");
const checkout_module_1 = require("./checkout/checkout.module");
const webhook_module_1 = require("./webhook/webhook.module");
const review_module_1 = require("./review/review.module");
const revenue_module_1 = require("./revenue/revenue.module");
const email_module_1 = require("./email/email.module");
const config_1 = require("@nestjs/config");
const sale_module_1 = require("./sale/sale.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            store_module_1.StoreModule,
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            passport_1.PassportModule,
            redis_module_1.RedisModule,
            billboard_module_1.BillboardModule,
            category_module_1.CategoryModule,
            size_module_1.SizeModule,
            color_module_1.ColorModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            checkout_module_1.CheckoutModule,
            webhook_module_1.WebhookModule,
            review_module_1.ReviewModule,
            revenue_module_1.RevenueModule,
            email_module_1.EmailModule,
            sale_module_1.SaleModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: user_inteceptor_1.UserInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map