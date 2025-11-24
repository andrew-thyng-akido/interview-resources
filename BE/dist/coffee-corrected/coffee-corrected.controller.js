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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeCorrectedController = void 0;
const common_1 = require("@nestjs/common");
const coffee_corrected_service_1 = require("./coffee-corrected.service");
const create_coffee_dto_1 = require("./dtos/create-coffee.dto");
const update_coffee_dto_1 = require("./dtos/update-coffee.dto");
let CoffeeCorrectedController = class CoffeeCorrectedController {
    constructor(coffeeService) {
        this.coffeeService = coffeeService;
    }
    async getAll(page = '1', limit = '25') {
        const pageNum = Math.max(parseInt(page, 10) || 1, 1);
        const limitNum = Math.max(Math.min(parseInt(limit, 10) || 25, 100), 1);
        return this.coffeeService.findAll(pageNum, limitNum);
    }
    async getOne(id) {
        return this.coffeeService.findOne(+id);
    }
    async create(dto) {
        const created = await this.coffeeService.create(dto);
        return created;
    }
    async update(id, dto) {
        return this.coffeeService.update(+id, dto);
    }
    async remove(id) {
        await this.coffeeService.remove(+id);
        return;
    }
};
exports.CoffeeCorrectedController = CoffeeCorrectedController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CoffeeCorrectedController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoffeeCorrectedController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coffee_dto_1.CreateCoffeeCorrectedDto]),
    __metadata("design:returntype", Promise)
], CoffeeCorrectedController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coffee_dto_1.UpdateCoffeeCorrectedDto]),
    __metadata("design:returntype", Promise)
], CoffeeCorrectedController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoffeeCorrectedController.prototype, "remove", null);
exports.CoffeeCorrectedController = CoffeeCorrectedController = __decorate([
    (0, common_1.Controller)('coffee-corrected'),
    __metadata("design:paramtypes", [coffee_corrected_service_1.CoffeeCorrectedService])
], CoffeeCorrectedController);
//# sourceMappingURL=coffee-corrected.controller.js.map