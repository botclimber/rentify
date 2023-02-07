import { User } from "../../../Database/src/entity/User";
import { userRepository } from "../server";
import { Router, Request, Response, NextFunction } from 'express';
import express = require("express");

export const userRouter = Router();
userRouter.use(express.json());

userRouter.get('/', (req, res) => {
    res.json("Ola");
})

const users = [];
userRouter.post('/newUser', async (req: Request, res: Response) => {
    try {
        console.log("Inserting a new user into the database...")
        const user = new User()
        user.email = "walter@gmail.com";
        user.password = req.body.password;
        user.username = req.body.username;
        user.name = "walter";
        await userRepository.save(user)
        console.log("Saved a new user with id: " + user.id)

        console.log("Loading users from the database...")
        const users = await userRepository.findOneBy(user)
        console.log("Loaded users: ", users)

        console.log("Here you can setup and run express / fastify / any other framework.")
    } catch {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

export default userRouter;


// router.post('/login', async (req, res) => {
//     console.log(users);
//     const user = users.find(user => user.username === req.body.username);
//     console.log(user);
//     if (user == null) {
//         return res.status(404).json({ message: "User not found" })
//     }
//     try {
//         if (await bcrypt.compare(req.body.password, user.password)) {
//             res.send('Success')
//         } else {
//             res.send('Failed')
//         }
//     } catch {
//         res.status(500).json({ message: "Internal Server Error" })
//     }
// })
