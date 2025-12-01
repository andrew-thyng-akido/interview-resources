import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { buildSequelizeConfig } from './sequelize.config';

@Module({
  imports: [SequelizeModule.forRoot(buildSequelizeConfig())],
})
export class DatabaseModule {}

