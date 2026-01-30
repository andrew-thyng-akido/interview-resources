import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Coffee } from './models/coffee.model';

@Module({
  imports: [SequelizeModule.forFeature([Coffee])],
  controllers: [CoffeeController],
  providers: [CoffeeService],
})
export class CoffeeModule {}

