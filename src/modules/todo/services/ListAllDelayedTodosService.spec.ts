import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";
import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../users/dtos/ICreateUserDTO";
import { User } from "../../users/infra/typeorm/entities/User";
import { UserRepositoryInMemory } from "../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "../../users/services/CreateUserService";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { TodosRepositoryInMemory } from "../repositories/in-memory/TodosRepositoryInMemory";
import { ListAllDelayedTodosService } from "./ListAllDelayedTodosService";
import { CreateTodoService } from "./CreateTodoService";

let createTodoService: CreateTodoService;
let todosRepositoryInMemory: TodosRepositoryInMemory;
let delayedTodosServices: ListAllDelayedTodosService;
let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;
let user: User;

describe("List all delayed Todos", () => {
  beforeEach(async () => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodoService = new CreateTodoService(todosRepositoryInMemory);
    delayedTodosServices = new ListAllDelayedTodosService(
      todosRepositoryInMemory
    );
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);

    const createUser: ICreateUserDTO = {
      email: "arthur@dent.com",
      password: "ford",
    };

    await createUserService.execute(createUser);

    user = await userRepositoryInMemory.findByEmail(createUser.email);
  });

  it("should be able to list all delayed todos", async () => {
    const todo: ICreateTodoDTO = {
      deadline: dayjs().subtract(5, "day").toDate(),
      description: "Teste delayed todo description",
      owner_id: user.id,
    };

    await createTodoService.execute(todo);

    const [delayedTodos, rows] = await delayedTodosServices.execute();

    expect(rows.totalRows).toEqual(1);

    expect(delayedTodos[0].isLate).toEqual(true);
  });

  it("should return nothing if not exists delayed todos", async () => {
    const todo: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste not delayed todo description",
      owner_id: user.id,
      status: "Completed",
    };

    await createTodoService.execute(todo);

    const [delayedTodos, rows] = await delayedTodosServices.execute();
    expect(rows.totalRows).toEqual(0);
    expect(delayedTodos.length).toEqual(0);
  });
});
