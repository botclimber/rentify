import { myDataSource } from "../../Database/src/data-source"
import { User } from "../../Database/src/entity/User";
import * as express from 'express';
import userRouter from "./routes/userRouter"
require('dotenv').config();

export const userRepository = myDataSource.getRepository(User)

// establish database connection
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


// app.set("view engine", "ejs")

const app = express();

app.use('/users', userRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`${port}`);
})

