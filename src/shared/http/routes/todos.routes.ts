import { Router } from "express";
import { CreateTodoController } from "../../../modules/todo/controllers/CreateTodoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const todosRoutes = Router();

const createTodoController = new CreateTodoController();

todosRoutes.use(ensureAuthenticated);

todosRoutes.post("/", createTodoController.handle);

export { todosRoutes };
