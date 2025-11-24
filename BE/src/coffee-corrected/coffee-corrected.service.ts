import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coffee } from './models/coffee.model';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';

@Injectable()
export class CoffeeCorrectedService {
  constructor(
      @InjectModel(Coffee)
      private readonly coffeeModel: typeof Coffee, // FIX: mark as readonly to prevent reassignment
  ) {}

  async findAll(page = 1, limit = 25) {
    // FIX: Replaced getAllCoffees() with findAll() and added pagination support
    // FIX: Properly calculate offset
    const offset = (page - 1) * limit;

    // FIX: Added consistent ordering for predictable output
    const { rows, count } = await this.coffeeModel.findAndCountAll({
      offset,
      limit,
      order: [['id', 'ASC']],
    });

    return {
      data: rows,
      total: count,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    // FIX: Renamed "fetchOne" to "findOne" to match NestJS conventions
    // FIX: Added explicit error handling with NotFoundException instead of returning undefined
    const coffee = await this.coffeeModel.findByPk(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  private normalizeFlavors(input?: string | string[]): string[] {
    if (!input) return [];
    return Array.isArray(input) ? input : [input];
  }

  async create(dto: CreateCoffeeDto) {
    // FIX: Removed "any" typing and replaced with a DTO
    // FIX: No need for try/catch fallback — Sequelize errors should propagate
    // FIX: No .then() chaining inside async function
    // FIX: Simplified flavors handling

    const flavors = this.normalizeFlavors(dto.flavors);

    return this.coffeeModel.create({
      name: dto.name,
      brand: dto.brand,
      flavors,
      price: dto.price,
    });
  }

  async update(id: number, dto: UpdateCoffeeDto) {
    // FIX: Renamed "patchCoffee" to "update" (Nest standard)
    // FIX: No silent null return — throw proper error
    const coffee = await this.findOne(id);

    // FIX: Removed Object.assign → can overwrite internal Sequelize fields accidentally
    // FIX: Use coffee.update() for type safety + field validation
    await coffee.update(dto);

    return coffee;
  }

  async remove(id: number) {
    // FIX: Renamed removeCoffee → remove (Nest naming convention)
    // FIX: Return void instead of boolean flags (Nest standard)
    // FIX: Use findOne to reuse exception handling
    const coffee = await this.findOne(id);
    await coffee.destroy();
  }
}
