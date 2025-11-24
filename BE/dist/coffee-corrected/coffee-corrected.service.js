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
exports.CoffeeCorrectedService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const coffee_model_1 = require("./models/coffee.model");
let CoffeeCorrectedService = class CoffeeCorrectedService {
    constructor(coffeeModel) {
        this.coffeeModel = coffeeModel;
    }
    calculatePriceWithTax(price) {
        const TAX_RATE = 0.08;
        return parseFloat((price * (1 + TAX_RATE)).toFixed(2));
    }
    async findAll(page = 1, limit = 25) {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.coffeeModel.findAndCountAll({ offset, limit, order: [['id', 'ASC']] });
        const totalValueRaw = await this.coffeeModel.sum('price');
        const totalValue = typeof totalValueRaw === 'number' ? totalValueRaw : 0;
        const totalValueWithTax = rows.reduce((sum, c) => sum + this.calculatePriceWithTax(c.price), 0);
        return { data: rows, total: count, page, limit, totalValue, totalValueWithTax: parseFloat(totalValueWithTax.toFixed(2)) };
    }
    async findOne(id) {
        const coffee = await this.coffeeModel.findByPk(id);
        if (!coffee)
            throw new common_1.NotFoundException(`Coffee ${id} not found`);
        return coffee;
    }
    async create(dto) {
        return this.coffeeModel.create({ ...dto });
    }
    async update(id, dto) {
        const coffee = await this.findOne(id);
        await coffee.update({ ...dto });
        return coffee;
    }
    async remove(id) {
        const coffee = await this.findOne(id);
        await coffee.destroy();
    }
};
exports.CoffeeCorrectedService = CoffeeCorrectedService;
exports.CoffeeCorrectedService = CoffeeCorrectedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(coffee_model_1.CoffeeCorrected)),
    __metadata("design:paramtypes", [Object])
], CoffeeCorrectedService);
//# sourceMappingURL=coffee-corrected.service.js.map