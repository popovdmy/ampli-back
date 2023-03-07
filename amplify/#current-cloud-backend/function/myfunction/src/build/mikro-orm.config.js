"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    migrations: {
        tableName: 'mikro_orm_migrations',
        path: path_1.default.join(__dirname, './migrations'),
        glob: '!(*.d).{js,ts}',
        disableForeignKeys: false
    },
    entities: [path_1.default.join(__dirname, '../build/entities')],
    entitiesTs: [path_1.default.join(__dirname, './entities')],
    type: "postgresql",
    clientUrl: process.env.DB_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    dbName: process.env.DB_NAME || "postgres",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    host: process.env.DB_HOST || "postgres.cudickemyekp.us-east-1.rds.amazonaws.com",
    debug: true,
};
exports.default = config;
//# sourceMappingURL=mikro-orm.config.js.map