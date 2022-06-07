import { createConnection, getConnectionOptions } from "typeorm";
import connectionOptions from "../../../config/ormconfig";

createConnection(connectionOptions)
  .then(async () => {
    console.log("Postgres: Connected!");
  })
  .catch(async (error) => {
    console.log("Postgres: Failed to connect!");
    console.log(error);
  });
