import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

const users = [];

routes.post("/register", new UserController().register);
// routes.post("/login", new UserController().login);

// Routes for users that need to be authenticated
routes.use(authMiddleware);
// routes.get("/profile", new UserController().getProfile);

export default routes;
