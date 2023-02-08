import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/UserController";

const routes = Router();

const users = [];

routes.post("/newUser", new UserController().create);

routes.get("/", new UserController().get);

export default routes;
