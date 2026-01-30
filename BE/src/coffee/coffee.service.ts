import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coffee } from './models/coffee.model';

@Injectable()
export class CoffeeService {
  constructor(@InjectModel(Coffee) private coffeeModel: typeof Coffee) {}

  getAllCoffees() {
    return this.coffeeModel.findAll();
  }

  async fetchOne(id: number) {
    return this.coffeeModel.findByPk(id);
  }

  async createCoffee(data: any) {
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
    } catch (e) {
      return this.coffeeModel.create({ name: data.name, brand: data.brand, flavors: [], price: data.price || 0 });
    }
  }

  async patchCoffee(id: number, payload: any) {
    const coffee = await this.coffeeModel.findByPk(id);
    if (!coffee) {
      return null;
    }
    Object.assign(coffee, payload);
    coffee.save();
    return coffee;
  }

  async removeCoffee(id: number) {
    const coffee = await this.coffeeModel.findByPk(id);
    if (!coffee) return false;
    await coffee.destroy();
    return true;
  }
}
