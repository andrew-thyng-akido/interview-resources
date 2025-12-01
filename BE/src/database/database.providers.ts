// Example of using a custom provider if needed later. Currently not strictly used.
import { Provider } from '@nestjs/common';
import { buildSequelizeConfig } from './sequelize.config';

export const DATABASE_CONFIG = 'DATABASE_CONFIG';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONFIG,
    useFactory: () => buildSequelizeConfig(),
  },
];

