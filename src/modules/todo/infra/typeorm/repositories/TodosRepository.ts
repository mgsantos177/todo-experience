import { getRepository, Repository } from "typeorm";
import { ICreateTodoDTO } from "../../../dtos/ICreateTodoDTO";
import { ITodosRepository } from "../../../repositories/ITodosRepository";
import { Todo } from "../entities/Todo";

class TodosRepository implements ITodosRepository {
  private repository: Repository<Todo>;

  constructor() {
    this.repository = getRepository(Todo);
  }
  // async findByEmail(email: string): Promise<User> {
  //   const user = await this.repository.findOne({ email });

  //   return user;
  // }

  // async findById(id: string): Promise<User> {
  //   const user = await this.repository.findOne(id);

  //   return user;
  // }

  async create({
    id,
    description,
    ownerId,
    deadline,
  }: ICreateTodoDTO): Promise<Todo> {
    const todo = this.repository.create({
      id,
      description,
      owner_id: ownerId,
      deadline,
    });

    await this.repository.save(todo);

    return todo;
  }
}

export { TodosRepository };
