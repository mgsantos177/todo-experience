import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";
import { v4 as uuidV4 } from "uuid";

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ email, password }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      id: uuidV4(),
      email,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory };
