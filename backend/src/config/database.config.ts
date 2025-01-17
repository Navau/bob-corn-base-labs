import "dotenv/config";

import { DataSource } from "typeorm";
import { Corn } from "../entities/corn.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Corn],
  synchronize: true,
  logging: true,
});
