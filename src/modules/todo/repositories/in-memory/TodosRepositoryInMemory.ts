import dayjs from "dayjs";
import { v4 as uuidV4 } from "uuid";
import { ICreateTodoDTO } from "../../dtos/ICreateTodoDTO";
import { Todo } from "../../infra/typeorm/entities/Todo";
import { IPagination } from "../../interfaces/IPagination";
import { ITotalRows } from "../../interfaces/ITotalRows";
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
  async findAll(): Promise<[Todo[], number]> {
    return [this.todos, this.todos.length];
  }

  async findDelayedTodos(): Promise<[Todo[], number]> {
    const dateNow = dayjs().format();
    const delayedTodos: Todo[] = [];

    for (const todo of this.todos) {
      const todoDeadline = dayjs(todo.deadline).format("MM/DD/YYYY");
      const delay = dayjs(todoDeadline).diff(dateNow, "days");

      if (delay <= -1 && todo.status != "Completed") {
        delayedTodos.push(todo);
      }
    }

    return [delayedTodos, delayedTodos.length];
  }

  async findByUserId(owner_id: string): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.owner_id === owner_id);
  }

  async findById(id: string): Promise<Todo> {
    return this.todos.find((todo) => todo.id === id);
  }
}

export { TodosRepositoryInMemory };
