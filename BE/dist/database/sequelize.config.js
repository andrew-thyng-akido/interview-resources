"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSequelizeConfig = buildSequelizeConfig;
function buildSequelizeConfig() {
    const dialect = process.env.DB_DIALECT || 'sqlite';
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
//# sourceMappingURL=sequelize.config.js.map