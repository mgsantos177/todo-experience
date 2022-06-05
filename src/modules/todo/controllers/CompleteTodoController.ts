import { Request, Response } from "express";
import { container } from "tsyringe";
import { CompleteTodoService } from "../services/CompleteTodoService";

class CompleteTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = request.user;

    const completeTodoService = container.resolve(CompleteTodoService);
    const todo = await completeTodoService.execute({
      id,
      owner_id: user.id,
    });

    return response.status(200).json(todo);
  }
}

export { CompleteTodoController };
