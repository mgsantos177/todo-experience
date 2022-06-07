import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { AppError } from "../../../shared/errors/AppError";
import auth from "../../../config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const token = sign(
      {
        isAdmin: user.isAdmin,
        email: user.email,
      },
      auth.secret_token,
      {
        subject: user.id,
        expiresIn: auth.expires_in_token,
      }
    );

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserService };
