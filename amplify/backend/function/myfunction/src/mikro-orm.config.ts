import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import path from 'path';
import dotenv from "dotenv";

dotenv.config(); 

const config: Options<PostgreSqlDriver> = {
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    disableForeignKeys: false
  },
  entities: [path.join(__dirname, '../build/entities')], // no need for `entitiesTs` this way
  entitiesTs: [path.join(__dirname, './entities')], // path to our TS entities (src), relative to `baseDir`
  type: "postgresql",
  clientUrl: process.env.DB_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  dbName: process.env.DB_NAME || "postgres",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  host: process.env.DB_HOST || "postgres.cudickemyekp.us-east-1.rds.amazonaws.com",
  debug: true,
};

export default config;
