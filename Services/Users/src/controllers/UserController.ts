import { NextFunction, Response, Request } from "express";
import { userRepository } from "../../database/src/repositories/userRepository";
import { ErrorMessages } from "../helpers/errorMessages";
import { BadRequest, Unauthorized } from "../helpers/errorTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { EmailHelper } from "../helpers/emailHelper";

type JwtPayload = {
  id: number;
};

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    const { name, password, email, username } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequest(ErrorMessages.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      password: hashedPassword,
      email,
      username,
    });

    await userRepository.save(newUser);

    EmailHelper.sendVerifyEmail(newUser);

    const { password: _, ...user } = newUser;

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { password, email } = req.body;

    const user = await userRepository.findOneBy({ email });

    console.log("received");

    if (!user) {
      throw new BadRequest(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new BadRequest(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    return res.status(200).json({ user: userLogin, token: token });
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.user);
  }

  async verifyUser(req: Request, res: Response, next: NextFunction) {
    let { userId, emailToken } = req.params;

    const user = await userRepository.findOneBy({ id: +userId });

    if (!user) {
      throw new BadRequest("User does not exist");
    }

    const decode = jwt.verify(emailToken, process.env.JWT_SECRET ?? "");
    user.confirmed = true;
    await userRepository.save(user);

    return res.status(200).json(req.user);
  }
}
