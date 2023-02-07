import { NextFunction, Response, Request } from "express";
import { User } from "../../../../Database/src/entities/User";
import { userRepository } from "../../../../Database/src/repositories/userRepository";

export class UserController {
    async create(req: Request, res: Response, next: NextFunction) {


        console.log(req.body);

        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const name = req.body.name;

        if (!username) {
            return res.status(400).json({
                message: "Username is required"
            });
        }

        try {
            const user = new User();
            user.username = username;
            user.password = password;
            user.email = email;
            user.name = name;

            await userRepository.save(user)
            return res.status(200).json(user);
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                message: "Username is required"
            });
        }
    }
}