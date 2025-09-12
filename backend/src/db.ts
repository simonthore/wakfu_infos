import { DataSource } from 'typeorm';
import {env, loadEnv} from "./env";

loadEnv();
export default new DataSource({
     type: "postgres",
  host: typeof env.DB_HOST !== "undefined" ? env.DB_HOST : "db",
  port: 5432,
  username: "wakfu",
  password: "wakfu",
  database: "wakfu_db",
  synchronize: true,
  entities: [],
  logging: ["error"],
});

