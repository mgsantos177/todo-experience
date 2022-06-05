import { v4 as uuidV4 } from "uuid";
import dayjs from "dayjs";
import { AppError } from "../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../users/dtos/ICreateUserDTO";
import { User } from "../../users/infra/typeorm/entities/User";
import { UserRepositoryInMemory } from "../../users/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserService } from "../../users/services/CreateUserService";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";
import { TodosRepositoryInMemory } from "../repositories/in-memory/TodosRepositoryInMemory";
import { UpdateTodoService } from "./UpdateTodoService";
import { CreateTodoService } from "./CreateTodoService";

let createTodoService: CreateTodoService;
let todosRepositoryInMemory: TodosRepositoryInMemory;
let updateTodoServices: UpdateTodoService;
let createUserService: CreateUserService;
let userRepositoryInMemory: UserRepositoryInMemory;
let user: User;

describe("Update Todo", () => {
  beforeEach(async () => {
    todosRepositoryInMemory = new TodosRepositoryInMemory();
    createTodoService = new CreateTodoService(todosRepositoryInMemory);
    updateTodoServices = new UpdateTodoService(todosRepositoryInMemory);
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserService = new CreateUserService(userRepositoryInMemory);

    const createUser: ICreateUserDTO = {
      email: "arthur@dent.com",
      password: "ford",
    };

    await createUserService.execute(createUser);

    user = await userRepositoryInMemory.findByEmail(createUser.email);
  });

  it("should be able to update my todo description", async () => {
    const todo2: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste not delayed todo description",
      owner_id: user.id,
    };

    const createdTodo = await createTodoService.execute(todo2);

    const newDescription = "New Description";

    const updatedTodo = await updateTodoServices.execute({
      id: createdTodo.id,
      deadline: createdTodo.deadline,
      description: newDescription,
      owner_id: user.id,
    });

    expect(updatedTodo.description).toEqual(newDescription);
  });

  it("should be able to update my todo deadline", async () => {
    const todo2: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste not delayed todo description",
      owner_id: user.id,
    };

    const createdTodo = await createTodoService.execute(todo2);

    const newDeadline = dayjs().subtract(2, "day").toDate();

    const updatedTodo = await updateTodoServices.execute({
      id: createdTodo.id,
      deadline: newDeadline,
      description: "New Description",
      owner_id: user.id,
    });

    expect(updatedTodo.deadline).toEqual(newDeadline);
  });

  it("shouldn't able to update a todo created by other user", async () => {
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

    const newDeadline = dayjs().subtract(2, "day").toDate();

    try {
      await updateTodoServices.execute({
        id: createdTodo.id,
        deadline: newDeadline,
        description: "New Description",
        owner_id: user.id,
      });
    } catch (error) {
      expect(error).toEqual(
        new AppError("Only the todo owner can edit a todo", 401)
      );
    }
  });

  it("shouldn't able to update an completed todo", async () => {
    const todo2: ICreateTodoDTO = {
      deadline: new Date(),
      description: "Teste not delayed todo description",
      owner_id: user.id,
      status: "Completed",
    };

    const createdTodo = await createTodoService.execute(todo2);

    const newDeadline = dayjs().subtract(2, "day").toDate();

    try {
      await updateTodoServices.execute({
        id: createdTodo.id,
        deadline: newDeadline,
        description: "New Description",
        owner_id: user.id,
      });
    } catch (error) {
      expect(error).toEqual(
        new AppError("It's not possible to edit a completed todo", 401)
      );
    }
  });

  it("shouldn't able to update an not found todo", async () => {
    const newDeadline = dayjs().subtract(2, "day").toDate();

    try {
      await updateTodoServices.execute({
        id: uuidV4(),
        deadline: newDeadline,
        description: "New Description",
        owner_id: user.id,
      });
    } catch (error) {
      expect(error).toEqual(new AppError("Todo not found", 404));
    }
  });
});
