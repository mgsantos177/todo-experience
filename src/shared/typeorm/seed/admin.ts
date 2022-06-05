import { hash } from "bcryptjs";
import { createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import connectionOptions from "../../../config/ormconfig";

async function create() {
  const connection = await createConnection(connectionOptions);

  const id = uuidV4();

  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, email, password, "isAdmin", created_at, updated_at) 
      values('${id}','admin@ubistart.com.br', '${password}', true, 'now()', 'now()')`
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
