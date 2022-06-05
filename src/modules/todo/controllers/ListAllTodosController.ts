import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllTodosService } from "../services/ListAllTodosService";

class ListAllTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const take = +request.query.take || 10;
    const skip = +request.query.skip || 0;

    const listAllTodosService = container.resolve(ListAllTodosService);

    const todos = await listAllTodosService.execute({ take, skip });

    return response.status(200).json(todos);
  }
}

export { ListAllTodosController };
