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
exports.CoffeeService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const coffee_model_1 = require("./models/coffee.model");
let CoffeeService = class CoffeeService {
    constructor(coffeeModel) {
        this.coffeeModel = coffeeModel;
    }
    getAllCoffees() {
        return this.coffeeModel.findAll();
    }
    async fetchOne(id) {
        return this.coffeeModel.findByPk(id);
    }
    async createCoffee(data) {
        if (!data.flavors) {
            data.flavors = [];
        }
        try {
            const created = await this.coffeeModel
                .create({
                name: data.name,
                brand: data.brand,
                flavors: Array.isArray(data.flavors) ? data.flavors : [data.flavors].filter(Boolean),
                price: data.price,
            })
                .then((r) => r);
            return created;
        }
        catch (e) {
            return this.coffeeModel.create({ name: data.name, brand: data.brand, flavors: [], price: data.price || 0 });
        }
    }
    async patchCoffee(id, payload) {
        const coffee = await this.coffeeModel.findByPk(id);
        if (!coffee) {
            return null;
        }
        Object.assign(coffee, payload);
        coffee.save();
        return coffee;
    }
    async removeCoffee(id) {
        const coffee = await this.coffeeModel.findByPk(id);
        if (!coffee)
            return false;
        await coffee.destroy();
        return true;
    }
};
exports.CoffeeService = CoffeeService;
exports.CoffeeService = CoffeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(coffee_model_1.Coffee)),
    __metadata("design:paramtypes", [Object])
], CoffeeService);
//# sourceMappingURL=coffee.service.js.map