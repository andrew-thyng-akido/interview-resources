import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { CoffeeCorrectedService } from './coffee-corrected.service';
import { CreateCoffeeDto } from './dtos/create-coffee.dto';
import { UpdateCoffeeDto } from './dtos/update-coffee.dto';

@Controller('coffee-corrected')
export class CoffeeCorrectedController {
  constructor(private readonly coffeeService: CoffeeCorrectedService) {}

  /**
   * FIXES APPLIED:
   * - FIX: removed @HttpCode(201). GET must return 200, Nest does it automatically.
   * - FIX: renamed grabAll → getAll for clear REST naming.
   * - FIX: pagination supported instead of returning everything.
   * - FIX: removed business logic from controller — mapping “cheap” now done in service (thin controller).
   */
  @Get()
  async getAll(
      @Query('page') page = '1',
      @Query('limit') limit = '25',
  ) {
    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.max(Math.min(parseInt(limit, 10) || 25, 100), 1);
    return this.coffeeService.findAll(pageNum, limitNum);
  }

  /**
   * FIXES APPLIED:
   * - FIX: Using ParseIntPipe instead of +id → gives automatic 400 Bad Request for invalid ID.
   * - FIX: method renamed from single → getOne (REST-consistent naming).
   * - FIX: removed custom `{ message: 'not found' }` — service throws NotFoundException, returning proper 404.
   */
  @Get(':id')
  async getOne(
      @Param('id', ParseIntPipe) id: number,
  ) {
    return this.coffeeService.findOne(id);
  }

  /**
   * FIXES APPLIED:
   * - FIX: removed try/catch fallback that manually created a Coffee row.
   * - FIX: removed `.get()` calls — service returns plain objects.
   * - FIX: added @HttpCode(201) because resource is created.
   * - FIX: renamed make → create for standard REST naming.
   */
  @Post()
  @HttpCode(201)
  async create(@Body() dto: CreateCoffeeDto) {
    return this.coffeeService.create(dto);
  }

  /**
   * FIXES APPLIED:
   * - FIX: Using ParseIntPipe instead of +id.
   * - FIX: simplified return — service returns updated object or throws NotFoundException.
   * - FIX: renamed mutate → update for conventional naming.
   * - FIX: removed `{ ok: false }` anti-pattern.
   */
  @Patch(':id')
  async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, dto);
  }

  /**
   * FIXES APPLIED:
   * - FIX: DELETE should return 204 No Content — use @HttpCode(204).
   * - FIX: removed return value `{ deleted: true }` — 204 means success with no body.
   * - FIX: parse ID with pipe for safety.
   */
  @Delete(':id')
  @HttpCode(204)
  async remove(
      @Param('id', ParseIntPipe) id: number,
  ) {
    await this.coffeeService.remove(id);
    return;
  }
}
