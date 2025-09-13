import { DataSource } from "typeorm";
import Jeton from "./entities/Jeton";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "127.0.0.1",
  port: 5432,
  username: "wakfu_user",
  password: "wakfu_pass",
  database: "wakfu_db",
  synchronize: true,
  logging: false,
  entities: [Jeton],
});
