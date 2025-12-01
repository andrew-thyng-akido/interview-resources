import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

// Centralized Sequelize configuration. We attempt to read environment variables.
// Falls back to an in-memory sqlite database so the project is runnable out-of-the-box.
export function buildSequelizeConfig(): SequelizeModuleOptions {
  const dialect = (process.env.DB_DIALECT as Dialect) || 'sqlite';
  if (dialect === 'sqlite') {
    return {
      dialect: 'sqlite',
      storage: process.env.DB_SQLITE_FILE || ':memory:',
      logging: false,
      autoLoadModels: true,
      synchronize: true,
    };
  }
  return {
    dialect,
    host: process.env.DB_HOST || 'localhost',
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'coffee_db',
    logging: false,
    autoLoadModels: true,
    synchronize: true,
  };
}

