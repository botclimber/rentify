import { NextFunction, Response, Request } from "express";
import { userRepository } from "../../database/src/repositories/userRepository";
import { ErrorMessages } from "../helpers/constants";
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
    const { firstName, lastName, password, email, username } = req.body;

    console.log(`Registration Request for email: ${email}`);

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequest(ErrorMessages.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      username,
    });

    await userRepository.save(newUser);
    console.log(`Registration Successful for email: ${email}`);

    EmailHelper.sendVerifyEmail(newUser);
    console.log(`Sending verification email to: ${email}`);

    const { password: _, ...user } = newUser;

    return res.status(201).json(user);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { password, email } = req.body;

    console.log(`Login Request for email: ${email}`);

    const user = await userRepository.findOneBy({ email });

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

    console.log(`Login Successful for email: ${email}`);

    return res.status(200).json({ user: userLogin, token: token });
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.user);
  }

  async verifyUser(req: Request, res: Response, next: NextFunction) {
    let { userId, emailToken } = req.params;

    console.log(`verifyUser Request for userId: ${userId}`);

    const user = await userRepository.findOneBy({ id: +userId });

    if (!user) {
      throw new BadRequest("User does not exist");
    }

    const decode = jwt.verify(emailToken, process.env.JWT_SECRET ?? "");
    user.verified = true;
    await userRepository.save(user);
    console.log(`User with ID ${userId} verified`);

    return res.status(200).json(req.user);
  }

  async changePasswordRequest(req: Request, res: Response, next: NextFunction) {
    let { email } = req.params;

    console.log(`changePasswordRequest Request for email: ${email}`);

    const user = await userRepository.findOneBy({ email: email });

    if (!user) {
      throw new BadRequest("User does not exist");
    }

    EmailHelper.sendChangePasswordEmail(user);
    console.log(`Send password reset email to: ${email}`);

    return res.status(200).json(req.user);
  }

  async updateUserPassword(req: Request, res: Response, next: NextFunction) {
    let { userId, emailToken } = req.params;

    console.log(`updateUserPassword Request for userId: ${userId}`);

    const user = await userRepository.findOneBy({ id: +userId });

    if (!user) {
      throw new BadRequest("User does not exist");
    }

    const decode = jwt.verify(emailToken, process.env.JWT_SECRET ?? "");

    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    console.log("Sucessfully updated password");

    await userRepository.save(user);

    return res.status(200).json(req.user);
  }
}
