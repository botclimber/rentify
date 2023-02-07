import { User } from "../../../../Database/src/entities/User";
import { Router, Request, Response } from 'express';
import { UserController } from "../controllers/UserController";
//import express = require("express");

const routes = Router();
//routes.use(express.json());

const users = [];

routes.post('/newUser', new UserController().create)

// userRouter.post('/newUser', async (req: Request, res: Response) => {
//     try {
//         console.log("Inserting a new user into the database...")
//         const user = new User()
//         user.email = "walter@gmail.com";
//         user.password = req.body.password;
//         user.username = req.body.username;
//         user.name = "walter";
//         await userRepository.save(user)
//         console.log("Saved a new user with id: " + user.id)

//         console.log("Loading users from the database...")
//         const users = await userRepository.findOneBy(user)
//         console.log("Loaded users: ", users)

//         console.log("Here you can setup and run express / fastify / any other framework.")
//     } catch {
//         res.status(500).json({ message: "Internal Server Error" })
//     }
// })

export default routes;
