"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = exports.DATABASE_CONFIG = void 0;
const sequelize_config_1 = require("./sequelize.config");
exports.DATABASE_CONFIG = 'DATABASE_CONFIG';
exports.databaseProviders = [
    {
        provide: exports.DATABASE_CONFIG,
        useFactory: () => (0, sequelize_config_1.buildSequelizeConfig)(),
    },
];
//# sourceMappingURL=database.providers.js.map