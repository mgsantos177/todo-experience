import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";
import { ITodosRepository } from "../repositories/ITodosRepository";
dayjs.extend(utc);

@injectable()
class ListMyTodosService {
  constructor(
    @inject("TodosRepository")
    private todosRepository: ITodosRepository
  ) {}

  async execute(ownerId: string): Promise<Todo[]> {
    const todos = await this.todosRepository.findByUserId(ownerId);

    const dateNow = dayjs().format("MM/DD/YYYY");
    for (const todo of todos) {
      const todoDeadline = dayjs(todo.deadline).format("MM/DD/YYYY");
      const delay = dayjs(todoDeadline).diff(dateNow, "days");

      if (todo.status === "Completed") {
        continue;
      }

      if (delay <= -1) {
        todo.isLate = true;
      }
    }

    return todos;
  }
}

export { ListMyTodosService };
