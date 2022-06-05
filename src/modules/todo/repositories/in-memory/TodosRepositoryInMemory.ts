import { v4 as uuidV4 } from "uuid";
import { ICreateTodoDTO } from "../../dtos/ICreateTodoDTO";
import { Todo } from "../../infra/typeorm/entities/Todo";
import { ITodosRepository } from "../ITodosRepository";

class TodosRepositoryInMemory implements ITodosRepository {
  todos: Todo[] = [];
  async save({
    deadline,
    description,
    owner_id,
    status,
  }: ICreateTodoDTO): Promise<Todo> {
    const todo = new Todo();

    Object.assign(todo, {
      id: uuidV4(),
      deadline,
      description,
      owner_id,
      status: status ? status : "Pending",
      created_date: new Date(),
      updated_at: new Date(),
    });

    this.todos.push(todo);

    return todo;
  }
  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  async findByUserId(owner_id: string): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.owner_id === owner_id);
  }

  async findById(id: string): Promise<Todo> {
    return this.todos.find((todo) => todo.id === id);
  }
}

export { TodosRepositoryInMemory };
