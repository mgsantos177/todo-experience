import { Router } from "express";
import { autheticateRoutes } from "./authenticate.routes";
import { todosRoutes } from "./todos.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/todos", todosRoutes);
router.use(autheticateRoutes);

export { router };
