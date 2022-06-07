import { ConnectionOptions } from "typeorm";
import { Todo } from "../modules/todo/infra/typeorm/entities/Todo";
import { User } from "../modules/users/infra/typeorm/entities/User";
import * as migrations from "../shared/infra/typeorm/migrations";
import "dotenv/config";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Todo, User],
  migrations: [...Object.values(migrations)],
  migrationsRun: true,
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
  },
};

export default connectionOptions;
