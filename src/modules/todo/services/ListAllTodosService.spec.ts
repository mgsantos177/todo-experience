import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";
import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../users/dtos/ICreateUserDTO";
import { User } from "../../users/infra/typeorm/entities/User";
import { UserRepositoryInMemory } from "../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "../../users/services/CreateUserService";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { TodosRepositoryInMemory } from "../repositories/in-memory/TodosRepositoryInMemory";
import { ListAllTodosService } from "./ListAllTodosService";
import { CreateTodoService } from "./CreateTodoService";

let createTodoService: CreateTodoService;
let todosRepositoryInMemory: TodosRepositoryInMemory;
let listAllTodosServices: ListAllTodosService;
let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;
let user: User;

describe("List all Todos", () => {
  beforeEach(async () => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodoService = new CreateTodoService(todosRepositoryInMemory);
    listAllTodosServices = new ListAllTodosService(todosRepositoryInMemory);
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);

    const createUser: ICreateUserDTO = {
      email: "arthur@dent.com",
      password: "ford",
    };

    await createUserService.execute(createUser);

    user = await userRepositoryInMemory.findByEmail(createUser.email);
  });

  it("should be able to list all todos", async () => {
    const todo: ICreateTodoDTO = {
      deadline: dayjs().subtract(2, "day").toDate(),
      description: "Teste delayed todo description",
      owner_id: user.id,
    };

    const todo2: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste not delayed todo description",
      owner_id: user.id,
    };

    await createTodoService.execute(todo);
    await createTodoService.execute(todo2);

    const delayedTodos = await listAllTodosServices.execute();

    expect(delayedTodos.length).toEqual(2);
  });
});
