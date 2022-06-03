import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "todo",
  entities: ["./src/modules/**/entities/*.ts"],
  migrations: ["./src/shared/typeorm/migrations/*.ts"],
  migrationsRun: true,
  cli: {
    migrationsDir: "./src/shared/typeorm/migrations",
  },
};

export default connectionOptions;
