// server init goes here
import { AppDataSource } from "../../../ormDB/ormDB/src/data-source";

import express from "express"
import routes from "./routes/routes"
import bodyParser from "body-parser"
import cors from "cors"

AppDataSource
  .initialize()
  .then(() => {
    const app = express();
    app.use(express.json());

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(cors())

    app.use("/reviews", routes);

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`${port}`);
    });

    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });