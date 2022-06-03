import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AutheticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authenticateInfo = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json(authenticateInfo);
  }
}

export { AutheticateUserController };
