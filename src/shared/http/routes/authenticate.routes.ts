import { Router } from "express";
import { AutheticateUserController } from "../../../modules/users/controllers/AuthenticateUserController";

const autheticateRoutes = Router();

const autheticateUserController = new AutheticateUserController();

autheticateRoutes.post("/sessions", autheticateUserController.handle);

export { autheticateRoutes };
