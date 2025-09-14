import { DataSource } from 'typeorm';
import {env, loadEnv} from "./env";
import Jeton from './entity/Jeton';


loadEnv();

export default new DataSource({
  type: "postgres",
  host: typeof env.DB_HOST !== "undefined" ? env.DB_HOST : "db",
  port: 5433,
  username:  "wakfu_user",
  password: "wakfu",
  database:   "wakfu_db",
  synchronize: true,
  entities: [Jeton],
  logging:["error"]
  // test
});