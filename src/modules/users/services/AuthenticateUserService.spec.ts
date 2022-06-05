import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../repositories/in-memory/UserRepositoryInMemory";
import { AuthenticateUserService } from "./AuthenticateUserService";
import { CreateUserService } from "./CreateUserService";

let autheticateUserService: AuthenticateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserService: CreateUserService;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    autheticateUserService = new AuthenticateUserService(
      userRepositoryInMemory
    );
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      email: "arthur@dent.com",
      password: "ford",
    };

    await createUserService.execute(user);

    const result = await autheticateUserService.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("shouldn't be able to authenticate an nexistent user", async () => {
    await expect(
      autheticateUserService.execute({
        email: "zaphod@email.com",
        password: "adams",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!", 401));
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    const user: ICreateUserDTO = {
      email: "zaphod@email.com",
      password: "adams",
    };

    await createUserService.execute(user);

    try {
      await autheticateUserService.execute({
        email: user.email,
        password: "1234",
      });
    } catch (error) {
      expect(error).toEqual(new AppError("Email or password incorrect!", 401));
    }
  });

  it("should not be able to authenticate an user with incorrect email", async () => {
    const user: ICreateUserDTO = {
      email: "zaphod@email.com",
      password: "adams",
    };

    await createUserService.execute(user);

    try {
      await autheticateUserService.execute({
        email: "erro@test.com",
        password: user.password,
      });
    } catch (error) {
      expect(error).toEqual(new AppError("Email or password incorrect!", 401));
    }
  });
});
