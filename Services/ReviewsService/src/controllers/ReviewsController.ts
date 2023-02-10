import { NextFunction, Response, Request } from "express";
import { reviewsRepository } from "../../../../ormDB/ormDB/src/repositories/reviewsRepository";

export class ReviewsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    const data = reviewsRepository.find({
      relations:{
        Addresses: true
      }
    })
    return res.status(201).json(reviews)
  }
  
}