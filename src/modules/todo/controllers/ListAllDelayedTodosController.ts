import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllDelayedTodosService } from "../services/ListAllDelayedTodosService";

class ListAllDelayedTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllDelayedTodosService = container.resolve(
      ListAllDelayedTodosService
    );
    const take = +request.query.take || 10;
    const skip = +request.query.skip || 0;

    const todos = await listAllDelayedTodosService.execute({ take, skip });

    return response.status(200).json(todos);
  }
}

export { ListAllDelayedTodosController };
