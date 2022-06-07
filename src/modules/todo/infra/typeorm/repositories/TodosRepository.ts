import { getRepository, Repository } from "typeorm";
import { AppError } from "../../../../../shared/errors/AppError";
import { ICreateTodoDTO } from "../../../dtos/ICreateTodoDTO";
import { IUpdateTodoDTO } from "../../../dtos/IUpdateTodoDTO";
import { IPagination } from "../../../interfaces/IPagination";
import { ITotalRows } from "../../../interfaces/ITotalRows";
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

  async findAll({ skip, take }: IPagination): Promise<[Todo[], number]> {
    const todos = await this.repository
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.user", "user")
      .select([
        "todo.id",
        "todo.description",
        "todo.deadline",
        "todo.status",
        "todo.updated_at",
        "user.email",
      ])
      .skip(skip)
      .take(take)
      .getManyAndCount();

    return todos;
  }

  async findDelayedTodos({
    skip,
    take,
  }: IPagination): Promise<[Todo[], number]> {
    const today = new Date().toISOString().split("T")[0].toString();

    const todos = await this.repository
      .createQueryBuilder("todo")
      .leftJoinAndSelect("todo.user", "user")
      .select([
        "todo.id",
        "todo.description",
        "todo.deadline",
        "todo.status",
        "todo.updated_at",
        "user.email",
      ])
      .where(`todo.deadline < :today AND Status != 'Completed'`, { today })
      .skip(skip)
      .take(take)
      .getManyAndCount();

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
