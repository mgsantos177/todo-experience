import { getRepository, Repository } from "typeorm";
import { AppError } from "../../../../../shared/errors/AppError";
import { ICreateTodoDTO } from "../../../dtos/ICreateTodoDTO";
import { IUpdateTodoDTO } from "../../../dtos/IUpdateTodoDTO";
import { IPagination } from "../../../interfaces/IPagination";
import { ITodosRepository } from "../../../repositories/ITodosRepository";
import { Todo } from "../entities/Todo";

class TodosRepository implements ITodosRepository {
  private repository: Repository<Todo>;

  constructor() {
    this.repository = getRepository(Todo);
  }
  async findById(id: string): Promise<Todo> {
    return await this.repository.findOne({ id });
  }

  async findAll({ skip, take }: IPagination): Promise<Todo[]> {
    const todos = await this.repository
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.user", "user")
      .select(["todo.id", "todo.description", "todo.deadline", "user.email"])
      .skip(skip)
      .take(take)
      .getMany();
    return todos;
  }

  async findByUserId(owner_id: string): Promise<Todo[]> {
    const todos = await this.repository.find({ owner_id });

    return todos;
  }

  async save({
    id,
    description,
    owner_id,
    deadline,
    status,
  }: ICreateTodoDTO): Promise<Todo> {
    const todo = this.repository.create({
      id,
      description,
      owner_id,
      deadline,
      status,
    });

    await this.repository.save(todo);

    return todo;
  }
}

export { TodosRepository };
