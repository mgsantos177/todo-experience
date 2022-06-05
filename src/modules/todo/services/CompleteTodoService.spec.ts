import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../users/dtos/ICreateUserDTO";
import { User } from "../../users/infra/typeorm/entities/User";
import { UserRepositoryInMemory } from "../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "../../users/services/CreateUserService";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { TodosRepositoryInMemory } from "../repositories/in-memory/TodosRepositoryInMemory";
import { CompleteTodoService } from "./CompleteTodoService";
import { CreateTodoService } from "./CreateTodoService";

let createTodoService: CreateTodoService;
let todosRepositoryInMemory: TodosRepositoryInMemory;
let completeTodoService: CompleteTodoService;
let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;
let user: User;

describe("Complete Todo", () => {
  beforeEach(async () => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodoService = new CreateTodoService(todosRepositoryInMemory);
    completeTodoService = new CompleteTodoService(todosRepositoryInMemory);
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);

    const createUser: ICreateUserDTO = {
      email: "arthur@dent.com",
      password: "ford",
    };

    await createUserService.execute(createUser);

    user = await userRepositoryInMemory.findByEmail(createUser.email);
  });

  it("should be able to complete an todo", async () => {
    const todo: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste todo description",
      owner_id: user.id,
    };

    const createTodo = await createTodoService.execute(todo);

    const completedTodo = await completeTodoService.execute({
      id: createTodo.id,
      owner_id: user.id,
    });

    expect(completedTodo.status).toEqual("Completed");
  });

  it("shouldn't be able to complete an not found todo", async () => {
    try {
      await completeTodoService.execute({
        id: "73d04550-3b7f-4a5d-bafc-f2f84734952c",
        owner_id: user.id,
      });
    } catch (error) {
      expect(error).toEqual(new AppError("Todo not found", 404));
    }
  });

  it("shouldn't able to complete a todo created by other user", async () => {
    const createUser2: ICreateUserDTO = {
      email: "trillian3@dent.com",
      password: "ford",
    };

    await createUserService.execute(createUser2);

    const user2 = await userRepositoryInMemory.findByEmail(createUser2.email);

    const todo2: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste not delayed todo description",
      owner_id: user2.id,
    };

    const createdTodo = await createTodoService.execute(todo2);

    try {
      await completeTodoService.execute({
        id: createdTodo.id,
        owner_id: user.id,
      });
    } catch (error) {
      expect(error).toEqual(
        new AppError("Only the todo owner can edit a todo", 401)
      );
    }
  });

  it("shouldn't able to complete an completed todo", async () => {
    const todo2: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste not delayed todo description",
      owner_id: user.id,
      status: "Completed",
    };

    const createdTodo = await createTodoService.execute(todo2);
    await completeTodoService.execute({
      id: createdTodo.id,
      owner_id: user.id,
    });

    try {
      await completeTodoService.execute({
        id: createdTodo.id,
        owner_id: user.id,
      });
    } catch (error) {
      expect(error).toEqual(
        new AppError("It's not possible to complete a completed todo", 401)
      );
    }
  });
});
