import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { IUpdateTodoDTO } from "../dtos/IUpdateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";
import { IPagination } from "../interfaces/IPagination";

interface ITodosRepository {
  save(data: ICreateTodoDTO): Promise<Todo>;
  findAll(pagination?: IPagination): Promise<Todo[]>;
  findById(id: string): Promise<Todo>;
  findByUserId(owner_id: string): Promise<Todo[]>;
}

export { ITodosRepository };
