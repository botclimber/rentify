import { myDataSource } from "../../../Database/src/data-source"
import { User } from "../../../Database/src/entities/User";
import express from 'express';
import routes from "./routes/routes"
require('dotenv').config();


// establish database connection
myDataSource
    .initialize()
    .then(() => {

        const app = express();
        app.use(express.json());
        app.use('/user', routes);

        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`${port}`);
        })

        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })


// app.set("view engine", "ejs")



