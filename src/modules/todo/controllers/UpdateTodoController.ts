import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTodoService } from "../services/UpdateTodoService";

class UpdateTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deadline, description } = request.body;
    const { id } = request.params;
    const user = request.user;

    const updateTodoService = container.resolve(UpdateTodoService);
    const todo = await updateTodoService.execute({
      deadline,
      description,
      id,
      owner_id: user.id,
    });

    return response.status(200).json(todo);
  }
}

export { UpdateTodoController };
