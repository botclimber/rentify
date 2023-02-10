import { Router } from "express";
import { ReviewsController } from "../controllers/ReviewsController";

const routes = Router();

routes.get("/getAll", new ReviewsController().getAll);

export default routes;