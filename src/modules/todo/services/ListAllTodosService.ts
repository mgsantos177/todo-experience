import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { Todo } from "../infra/typeorm/entities/Todo";
import { ITodosRepository } from "../repositories/ITodosRepository";
import { IPagination } from "../interfaces/IPagination";
import { ITotalRows } from "../interfaces/ITotalRows";
dayjs.extend(utc);

@injectable()
class ListAllTodosService {
  constructor(
    @inject("TodosRepository")
    private todosRepository: ITodosRepository
  ) {}

  async execute(pagination?: IPagination): Promise<[Todo[], ITotalRows]> {
    const [todos, totalRows] = await this.todosRepository.findAll(pagination);

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

    return [todos, { totalRows }];
  }
}

export { ListAllTodosService };
