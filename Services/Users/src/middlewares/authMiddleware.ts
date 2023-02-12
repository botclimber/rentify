import { NextFunction, Request, Response } from "express";
import { userRepository } from "../../database/src/repositories/userRepository";
import { ErrorMessages } from "../helpers/errorMessages";
import { Unauthorized } from "../helpers/errorTypes";
import jwt from "jsonwebtoken";
import "dotenv/config";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized(ErrorMessages.USER_NOT_AUTHORIZED);
  }

  const token = authorization.split(" ")[1];

  const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload;

  const user = await userRepository.findOneById(id);

  if (!user) {
    throw new Unauthorized(ErrorMessages.USER_NOT_AUTHORIZED);
  }

  const { password: _, ...loggedUser } = user;

  req.user = loggedUser;

  next();
};
