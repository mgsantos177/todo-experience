import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { ICompleteTodoDTO } from "../dtos/ICompleteTodoDTO";
import { IUpdateTodoDTO } from "../dtos/IUpdateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";
import { ITodosRepository } from "../repositories/ITodosRepository";

@injectable()
class CompleteTodoService {
  constructor(
    @inject("TodosRepository")
    private todosRepository: ITodosRepository
  ) {}

  async execute({ id, owner_id }: ICompleteTodoDTO): Promise<Todo> {
    const todo = await this.todosRepository.findById(id);

    if (!todo) {
      throw new AppError("Todo not found", 404);
    }

    if (todo.owner_id !== owner_id) {
      throw new AppError("Only the todo owner can edit a todo", 401);
    }

    if (todo.status === "Completed") {
      throw new AppError("It's not possible to complete a completed todo", 401);
    }

    todo.status = "Completed";

    const savedTodo = await this.todosRepository.save(todo);

    return savedTodo;
  }
}

export { CompleteTodoService };
