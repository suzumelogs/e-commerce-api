"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterceptor = void 0;
const jwt = require("jsonwebtoken");
class UserInterceptor {
    async intercept(context, handler) {
        var _a, _b;
        const request = context.switchToHttp().getRequest();
        const token = (_b = (_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split('Bearer ')[1];
        const user = jwt.decode(token);
        request.user = user;
        return handler.handle();
    }
}
exports.UserInterceptor = UserInterceptor;
//# sourceMappingURL=user.inteceptor.js.map