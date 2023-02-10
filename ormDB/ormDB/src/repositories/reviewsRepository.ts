import { AppDataSource } from "../data-source";
import { Reviews } from "../entities/Reviews";

export const reviewsRepository = AppDataSource.getRepository(Reviews);