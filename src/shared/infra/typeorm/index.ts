import { createConnection } from "typeorm";
import connectionOptions from "../../../config/ormconfig";

createConnection(connectionOptions)
  .then(() => {
    console.log("Postgres: Connected!");
  })
  .catch((error) => {
    console.log("Postgres: Failed to connect!");
    console.log(error);
  });
