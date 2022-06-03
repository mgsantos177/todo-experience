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
    ownerId,
  }: ICreateTodoDTO): Promise<Todo> {
    return await this.todosRepository.create({
      deadline,
      description,
      ownerId,
    });
  }
}

export { CreateTodoService };
