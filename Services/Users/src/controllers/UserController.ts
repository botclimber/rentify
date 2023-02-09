import { NextFunction, Response, Request } from "express";
import { ErrorMessages } from "../helpers/errorMessages";
import { BadRequest, Unauthorized } from "../helpers/errorTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { prisma } from "./../../../../Database/script";

type JwtPayload = {
  id: number;
};

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    const { name, password, email, username } = req.body;

    const userExists = await prisma.user.findFirst({
      where: { email: email },
    });

    if (userExists) {
      throw new BadRequest(ErrorMessages.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log();
    const newUser = prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        username: username,
      },
    });

    // const { password: _, ...user } = newUser;

    return res.status(201).json(newUser);
  }

  // async login(req: Request, res: Response, next: NextFunction) {
  //   const { password, email } = req.body;

  //   const user = await userRepository.findOneBy({ email });

  //   if (!user) {
  //     throw new BadRequest(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
  //   }

  //   const verifyPassword = await bcrypt.compare(password, user.password);

  //   if (!verifyPassword) {
  //     throw new BadRequest(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
  //   }

  //   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
  //     expiresIn: "8h",
  //   });

  //   const { password: _, ...userLogin } = user;

  //   return res.status(200).json({ user: userLogin, token: token });
  // }

  // async getProfile(req: Request, res: Response, next: NextFunction) {
  //   return res.status(200).json(req.user);
  // }
}
