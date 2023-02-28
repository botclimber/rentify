import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();

routes.post("/register/common", new UserController().registCommon);
routes.post("/register/special", new UserController().registSpecial);
routes.post("/login/platform", new UserController().loginPlatform);
routes.post("/login/admin", new UserController().loginAdmin);
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
