import { ConnectionOptions } from "typeorm";
import 'dotenv/config'

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  migrationsRun: true,
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
};

export default connectionOptions;
