import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMyTodosService } from "../services/ListMyTodosService";

class ListMyTodosController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listMyTodosService = container.resolve(ListMyTodosService);
    const todos = await listMyTodosService.execute(id);

    return response.status(200).json(todos);
  }
}

export { ListMyTodosController };
