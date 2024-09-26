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
exports.UpdatePasswordDTO = exports.RestPasswordDTO = exports.UpdateUserDTO = exports.ResponseUserDTO = exports.LoginDTO = exports.SingupDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class SingupDTO {
}
exports.SingupDTO = SingupDTO;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SingupDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SingupDTO.prototype, "displayName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SingupDTO.prototype, "password", void 0);
class LoginDTO {
}
exports.LoginDTO = LoginDTO;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "password", void 0);
class ResponseUserDTO {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.ResponseUserDTO = ResponseUserDTO;
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], ResponseUserDTO.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ResponseUserDTO.prototype, "created_at", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", Date)
], ResponseUserDTO.prototype, "updated_at", void 0);
class UpdateUserDTO {
}
exports.UpdateUserDTO = UpdateUserDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "displayName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "avaterUrl", void 0);
class RestPasswordDTO {
}
exports.RestPasswordDTO = RestPasswordDTO;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RestPasswordDTO.prototype, "email", void 0);
class UpdatePasswordDTO {
}
exports.UpdatePasswordDTO = UpdatePasswordDTO;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePasswordDTO.prototype, "token", void 0);
//# sourceMappingURL=auth.dto.js.map