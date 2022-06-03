import { container } from "tsyringe";
import { TodosRepository } from "../../modules/todo/infra/typeorm/repositories/TodosRepository";
import { ITodosRepository } from "../../modules/todo/repositories/ITodosRepository";
import { UsersRepository } from "../../modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ITodosRepository>(
  "TodosRepository",
  TodosRepository
);
