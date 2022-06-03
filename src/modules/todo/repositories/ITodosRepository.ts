import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";

interface ITodosRepository {
  create(data: ICreateTodoDTO): Promise<Todo>;
  // listAll(email: string): Promise<User>;
  // findById(id: string): Promise<User>;
}

export { ITodosRepository };
