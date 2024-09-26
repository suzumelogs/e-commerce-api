"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
async function main() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bodyParser: false,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
    app.use(bodyParser.json({ verify: rawBodyBuffer }));
    const allowedOrigins = [
        'https://e-commerce-admin-cms.vercel.app',
        'https://e-commerce-ruby-two.vercel.app',
    ];
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
    });
    await app.listen(process.env.PORT || 5000);
}
const rawBodyBuffer = (req, res, buffer, encoding) => {
    if (!req.headers['stripe-signature']) {
        return;
    }
    if (buffer && buffer.length) {
        req.rawBody = buffer.toString(encoding || 'utf8');
    }
};
main();
//# sourceMappingURL=main.js.map