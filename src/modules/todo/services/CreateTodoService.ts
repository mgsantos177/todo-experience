import { inject, injectable } from "tsyringe";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";
import { ITodosRepository } from "../repositories/ITodosRepository";

@injectable()
class CreateTodoService {
  constructor(
    @inject("TodosRepository")
    private todosRepository: ITodosRepository
  ) {}

  async execute({
    deadline,
    description,
    owner_id,
  }: ICreateTodoDTO): Promise<Todo> {
    return await this.todosRepository.save({
      deadline,
      description,
      owner_id,
    });
  }
}

export { CreateTodoService };
