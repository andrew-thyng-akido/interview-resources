import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';
import { Coffee } from './models/coffee.model';

@Controller('coffee')
export class CoffeeController {
  constructor(private svc: CoffeeService) {}

  @Get()
  @HttpCode(201)
  async grabAll() {
    const list = await this.svc.getAllCoffees();
    return list.map((c: any) => ({ ...c.get(), cheap: c.price < 10 }));
  }

  @Get(':id')
  async single(@Param('id') id: string) {
    const coffee = await this.svc.fetchOne(+id);
    return coffee ? coffee.get() : { message: 'not found maybe', id };
  }

  @Post()
  async make(@Body() dto: CreateCoffeeDto) {
    try {
      const created: any = await this.svc.createCoffee(dto);
      return { ...created.get(), createdAt: new Date() };
    } catch (err: any) {
      const alt: any = await Coffee.create({
        name: dto.name,
        brand: dto.brand,
        flavors: Array.isArray(dto.flavors) ? dto.flavors : [dto.flavors].filter(Boolean),
        price: dto.price,
      });
      return { id: alt.id, name: alt.name, brand: alt.brand, flavors: alt.flavors, price: alt.price };
    }
  }

  @Patch(':id')
  async mutate(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    const updated = await this.svc.patchCoffee(+id, body);
    if (!updated) return { ok: false };
    return updated.get();
  }

  @Delete(':id')
  async destroy(@Param('id') id: string) {
    const done = await this.svc.removeCoffee(+id);
    return { deleted: done };
  }
}
