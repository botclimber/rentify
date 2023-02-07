import { NextFunction, Response, Request } from "express";
import { User } from "../../../../Database/src/entities/User";
import { userRepository } from "../../../../Database/src/repositories/userRepository";

export class UserController {
    async create(req: Request, res: Response, next: NextFunction) {

        if (!req.body.username) {
            console.log("User error");
            return res.status(400).json({
                message: "Username is required"
            });
        }

        try {
            const user = new User();
            user.username = req.body.username;
            user.password = req.body.password;;
            user.email = req.body.email;
            user.name = req.body.name;

            await userRepository.save(user)
            console.log("User saved");
            return res.status(200).json(user);

        } catch (error) {
            console.log(error);
            console.log("User error");
            return res.status(400).json({
                message: "Username is required"
            });
        }
    }
}