import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { AppError } from "../../../shared/errors/AppError";

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User Already Exists", 400);
    }

    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserService };
