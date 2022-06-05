import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTodoService } from "../services/CreateTodoService";

class CreateTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { deadline, description } = request.body;
    const { id } = request.user;

    const createTodoService = container.resolve(CreateTodoService);
    const todo = await createTodoService.execute({
      deadline,
      description,
      owner_id: id,
    });

    return response.status(201).json(todo);
  }
}

export { CreateTodoController };
