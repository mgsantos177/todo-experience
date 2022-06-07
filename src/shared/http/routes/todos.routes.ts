import { Router } from "express";
import { CompleteTodoController } from "../../../modules/todo/controllers/CompleteTodoController";
import { CreateTodoController } from "../../../modules/todo/controllers/CreateTodoController";
import { ListAllDelayedTodosController } from "../../../modules/todo/controllers/ListAllDelayedTodosController";
import { ListAllTodosController } from "../../../modules/todo/controllers/ListAllTodosController";
import { ListMyTodosController } from "../../../modules/todo/controllers/ListMyTodosController";
import { UpdateTodoController } from "../../../modules/todo/controllers/UpdateTodoController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const todosRoutes = Router();

const createTodoController = new CreateTodoController();
const updateTodoController = new UpdateTodoController();
const completeTodoController = new CompleteTodoController();

const listMyTodosController = new ListMyTodosController();

const listAllTodosController = new ListAllTodosController();
const listAllDelayedTodosController = new ListAllDelayedTodosController();

todosRoutes.use(ensureAuthenticated);

todosRoutes.post("/", createTodoController.handle);
todosRoutes.get("/", listMyTodosController.handle);
todosRoutes.put("/:id", updateTodoController.handle);
todosRoutes.patch("/:id", completeTodoController.handle);

todosRoutes.use(ensureAdmin);
todosRoutes.get("/admin/all", listAllTodosController.handle);
todosRoutes.get("/admin/delayed", listAllDelayedTodosController.handle);

export { todosRoutes };
