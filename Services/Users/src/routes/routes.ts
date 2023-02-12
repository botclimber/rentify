import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

routes.post("/register", new UserController().register);
routes.post("/login", new UserController().login);
routes.get("/verify/:userId/:emailToken", new UserController().verifyUser);
routes.get(
  "/changePassword/:email",
  new UserController().changePasswordRequest
);
routes.post(
  "/updatePassword/:userId/:emailToken",
  new UserController().updateUserPassword
);

routes.get("/profile", authMiddleware, new UserController().getProfile);

export default routes;
