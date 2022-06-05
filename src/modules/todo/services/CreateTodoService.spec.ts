import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../users/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "../../users/services/CreateUserService";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { TodosRepositoryInMemory } from "../repositories/in-memory/TodosRepositoryInMemory";
import { CreateTodoService } from "./CreateTodoService";

let createTodoService: CreateTodoService;
let todosRepositoryInMemory: TodosRepositoryInMemory;
let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;

describe("Create Todo", () => {
  beforeEach(() => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodoService = new CreateTodoService(todosRepositoryInMemory);
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);
  });

  it("should be able to create an todo", async () => {
    const user: ICreateUserDTO = {
      email: "arthur@dent.com",
      password: "ford",
    };

    await createUserService.execute(user);

    const findUser = await userRepositoryInMemory.findByEmail(user.email);

    const todo: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste todo description",
      owner_id: findUser.id,
    };

    const createTodo = await createTodoService.execute(todo);

    expect(createTodo).toHaveProperty("id");
  });
});
