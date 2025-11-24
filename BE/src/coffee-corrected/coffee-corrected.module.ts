import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CoffeeCorrectedController } from './coffee-corrected.controller';
import { CoffeeCorrectedService } from './coffee-corrected.service';
import { Coffee } from './models/coffee.model';

@Module({
  imports: [SequelizeModule.forFeature([Coffee])],
  controllers: [CoffeeCorrectedController],
  providers: [CoffeeCorrectedService],
})
export class CoffeeCorrectedModule {}

