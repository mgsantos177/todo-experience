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
class ListAllDelayedTodosService {
  constructor(
    @inject("TodosRepository")
    private todosRepository: ITodosRepository
  ) {}

  async execute(pagination?: IPagination): Promise<[Todo[], ITotalRows]> {
    const [todos] = await this.todosRepository.findDelayedTodos(pagination);

    for (const todo of todos) {
      todo.isLate = true;
    }

    return [todos, { totalRows: todos.length }];
  }
}

export { ListAllDelayedTodosService };
