import { Router } from "express";
import { ReviewsController } from "../controllers/ReviewsController";

const routes = Router();

routes.post("/getAll", new ReviewsController().getAll);

export default routes;