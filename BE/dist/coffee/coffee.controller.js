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
exports.CoffeeController = void 0;
const common_1 = require("@nestjs/common");
const coffee_service_1 = require("./coffee.service");
const create_coffee_dto_1 = require("./dtos/create-coffee.dto");
const update_coffee_dto_1 = require("./dtos/update-coffee.dto");
const coffee_model_1 = require("./models/coffee.model");
let CoffeeController = class CoffeeController {
    constructor(svc) {
        this.svc = svc;
    }
    async grabAll() {
        const list = await this.svc.getAllCoffees();
        return list.map((c) => ({ ...c.get(), cheap: c.price < 10 }));
    }
    async single(id) {
        const coffee = await this.svc.fetchOne(+id);
        return coffee ? coffee.get() : { message: 'not found maybe', id };
    }
    async make(dto) {
        try {
            const created = await this.svc.createCoffee(dto);
            return { ...created.get(), createdAt: new Date() };
        }
        catch (err) {
            const alt = await coffee_model_1.Coffee.create({
                name: dto.name,
                brand: dto.brand,
                flavors: Array.isArray(dto.flavors) ? dto.flavors : [dto.flavors].filter(Boolean),
                price: dto.price,
            });
            return { id: alt.id, name: alt.name, brand: alt.brand, flavors: alt.flavors, price: alt.price };
        }
    }
    async mutate(id, body) {
        const updated = await this.svc.patchCoffee(+id, body);
        if (!updated)
            return { ok: false };
        return updated.get();
    }
    async destroy(id) {
        const done = await this.svc.removeCoffee(+id);
        return { deleted: done };
    }
};
exports.CoffeeController = CoffeeController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoffeeController.prototype, "grabAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoffeeController.prototype, "single", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_coffee_dto_1.CreateCoffeeDto]),
    __metadata("design:returntype", Promise)
], CoffeeController.prototype, "make", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_coffee_dto_1.UpdateCoffeeDto]),
    __metadata("design:returntype", Promise)
], CoffeeController.prototype, "mutate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoffeeController.prototype, "destroy", null);
exports.CoffeeController = CoffeeController = __decorate([
    (0, common_1.Controller)('coffee'),
    __metadata("design:paramtypes", [coffee_service_1.CoffeeService])
], CoffeeController);
//# sourceMappingURL=coffee.controller.js.map