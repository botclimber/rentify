import { NextFunction, Response, Request } from "express";
import { User } from "../../../../Database/src/entities/User";
import { userRepository } from "../../../../Database/src/repositories/userRepository";
import { USERNAME_REQUIRED } from "../helpers/errorMessages";
import { BadRequestError, UnauthorizedError } from "../helpers/errorTypes";

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.body.username) {
      throw new BadRequestError(USERNAME_REQUIRED);
    }

    const user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.name = req.body.name;

    await userRepository.save(user);
    console.log("User saved");
    return res.status(201).json(user);
  }

  get(req: Request, res: Response, next: NextFunction) {
    throw new UnauthorizedError("Method not implemented.");
  }
}
