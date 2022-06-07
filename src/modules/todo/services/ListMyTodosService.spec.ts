import dayjs from "dayjs";
import { ICreateUserDTO } from "../../users/dtos/ICreateUserDTO";
import { User } from "../../users/infra/typeorm/entities/User";
import { UserRepositoryInMemory } from "../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "../../users/services/CreateUserService";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { TodosRepositoryInMemory } from "../repositories/in-memory/TodosRepositoryInMemory";
import { CreateTodoService } from "./CreateTodoService";
import { ListMyTodosService } from "./ListMyTodosService";

let createTodoService: CreateTodoService;
let todosRepositoryInMemory: TodosRepositoryInMemory;
let listMyTodosServices: ListMyTodosService;
let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;
let user: User;

describe("List my Todos", () => {
  beforeEach(async () => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodoService = new CreateTodoService(todosRepositoryInMemory);
    listMyTodosServices = new ListMyTodosService(todosRepositoryInMemory);
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);

    const createUser: ICreateUserDTO = {
      email: "arthur@dent.com",
      password: "ford",
    };

    await createUserService.execute(createUser);

    user = await userRepositoryInMemory.findByEmail(createUser.email);
  });

  it("should be able to list my todos", async () => {
    const todo: ICreateTodoDTO = {
      deadline: dayjs().subtract(2, "day").toDate(),
      description: "Teste delayed todo description",
      owner_id: user.id,
      status: "Completed",
    };

    const todo2: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste not delayed todo description",
      owner_id: user.id,
    };

    await createTodoService.execute(todo);
    await createTodoService.execute(todo2);

    const myTodos = await listMyTodosServices.execute(user.id);

    expect(myTodos.length).toEqual(2);
  });
});
