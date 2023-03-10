import { NextFunction, Response, Request } from "express";
import { userRepository } from "../../database/src/repositories/userRepository";
import { ErrorMessages } from "../helpers/constants";
import { BadRequest, Unauthorized } from "../helpers/errorTypes";
import bcrypt from "bcrypt";
import jwt, { verify } from "jsonwebtoken";
import "dotenv/config";
import { EmailHelper } from "../helpers/emailHelper";

type JwtPayload = {
  userId: number,
  userEmail: string,
  userType: string
};

export class UserController {
  async registCommon(req: Request, res: Response, next: NextFunction) {

    const { firstName, lastName, password, email, username } = req.body;
    const type = "common"

    console.log(`Registration Request for email: ${email}`);

    const userExists = await userRepository.findOneBy({ email });
    if (userExists) throw new BadRequest(ErrorMessages.USER_ALREADY_EXISTS);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      username,
      type
    });

    await userRepository.save(newUser);
    console.log(`Registration Successful for email: ${email}`);

    EmailHelper.sendVerifyEmail(newUser);
    console.log(`Sending verification email to: ${email}`);

    const { password: _, ...user } = newUser;

    return res.status(201).json(user); // return token ? or just regist status ?
  }

  async registSpecial(req: Request, res: Response, next: NextFunction) {

    const { firstName, lastName, password, email, username, type } = req.body;

    console.log(`Registration Request for email: ${email}`);

    const userExists = await userRepository.findOneBy({ email });
    if (userExists) throw new BadRequest(ErrorMessages.USER_ALREADY_EXISTS);

    const token: string = (req.headers['r-access-token'] ?? "") as string
    if(!token) throw new BadRequest(ErrorMessages.TOKEN_REQUIRED)

    try{
      const decToken: JwtPayload = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwtPayload
      const admin: any = await userRepository.findOneBy({id: decToken.userId})

      if( (admin.type == "admin" || admin.type == "superAdmin") && !admin.blocked){
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
          firstName,
          lastName,
          password: hashedPassword,
          email,
          username,
          type
        });

        await userRepository.save(newUser);
        console.log(`Registration Successful for email: ${email}`);

        EmailHelper.sendVerifyEmail(newUser);
        console.log(`Sending verification email to: ${email}`);

        const { password: _, ...user } = newUser;

        return res.status(201).json(user);

      }else throw new Unauthorized(ErrorMessages.ADMIN_NOT_FOUND)

    }catch (e){
      console.log(e)
      throw new BadRequest(ErrorMessages.INVALID_TOKEN)
    }
  }

  async loginPlatform(req: Request, res: Response, next: NextFunction) {
    const { password, email } = req.body;

    console.log(`Login Request for email: ${email}`);

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      console.log("INVALID EMAIL")
      throw new BadRequest(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      console.log("WRONG PASSWORD")
      throw new BadRequest(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
    }

    const token = jwt.sign({ userId: user.id, userEmail: user.email, userType: user.type }, process.env.JWT_SECRET ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    console.log(`Login Successful for email: ${email}`);

    return res.status(200).json({ user: {firstName: userLogin.firstName, lastName: userLogin.lastName}, token: token });
  }

  async loginAdmin(req: Request, res: Response, next: NextFunction) {
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

    if(user.type == "common") throw new Unauthorized(ErrorMessages.NO_PERMISSION)

    const token = jwt.sign({ userId: user.id, userEmail: user.email, userType: user.type }, process.env.JWT_SECRET ?? "", {
      expiresIn: "8h",
    });

    const { password: _, ...userLogin } = user;

    console.log(`Login Successful for email: ${email}`);

    return res.status(200).json({ user: {firstName: userLogin.firstName, lastName: userLogin.lastName}, token: token });
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.user);
  }

  // token in the url is a huge mistake, for now i will just workaround it
  async verifyUser(req: Request, res: Response, next: NextFunction) {
    let { userId, token } = req.params;

    console.log(`verifyUser Request for userId: ${userId}`);

    const user = await userRepository.findOneBy({ id: +userId });

    if (!user) {
      throw new BadRequest("User does not exist");
    }

    try{
      const decodedToken = jwt.verify(token.replaceAll("=",''), process.env.JWT_SECRET ?? ""); // if token wrong then triggers the catch exception
      console.log(decodedToken)
      user.verified = true;
      await userRepository.save(user);
      console.log(`User with ID ${userId} verified`);

      return res.status(200).json(req.user);

    }catch (e){
      console.log("Exception: "+e)
      throw new BadRequest(ErrorMessages.INVALID_TOKEN)
    }
  }

  // TODO: have a proper look on this method
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

  // TODO:
  // - have look on this method and adapt it (add try catch scope for token verification)
  async updateUserPassword(req: Request, res: Response, next: NextFunction) {
    let { userId, emailToken } = req.params;

    console.log(`updateUserPassword Request for userId: ${userId}`);

    const user = await userRepository.findOneBy({ id: +userId });

    if (!user) {
      throw new BadRequest("User does not exist");
    }

    const decode = jwt.verify(emailToken, process.env.JWT_SECRET ?? "") as JwtPayload; // whats the purpose of this line ?

    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    console.log("Sucessfully updated password");

    await userRepository.save(user);

    return res.status(200).json({msg: "updated  "});
  }

  // TODO: create method to change password with old password verification
}
