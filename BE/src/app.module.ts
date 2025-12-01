import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CoffeeModule } from './coffee/coffee.module';
import { CoffeeCorrectedModule } from './coffee-corrected/coffee-corrected.module';

@Module({
  imports: [DatabaseModule, CoffeeModule, CoffeeCorrectedModule],
})
export class AppModule {}

