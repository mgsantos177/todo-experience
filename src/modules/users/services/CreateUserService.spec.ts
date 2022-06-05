import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "./CreateUserService";

let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  it("should be able to create an user", async () => {
    const user: ICreateUserDTO = {
      email: "arthur@dent.com",
      password: "ford",
    };

    await createUserService.execute(user);

    const findUser = await userRepositoryInMemory.findByEmail(user.email);

    expect(findUser.email).toEqual(user.email);
  });

  it("shouldn't be able to create an user with the same email", async () => {
    const user: ICreateUserDTO = {
      email: "fort@prefect.com",
      password: "arthur",
    };

    const user2: ICreateUserDTO = {
      email: "fort@prefect.com",
      password: "zaphod",
    };

    await createUserService.execute(user);

    await expect(createUserService.execute(user2)).rejects.toEqual(
      new AppError("User Already Exists")
    );
  });
});
