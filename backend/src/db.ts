import { DataSource } from 'typeorm';
import {env, loadEnv} from "./env";

loadEnv();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: process.env.POSTGRES_DB || "wakfu",
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entities/*.{ts,js}"],
});