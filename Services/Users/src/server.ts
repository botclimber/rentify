import "express-async-errors";
import express from "express";
import routes from "./routes/routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();
app.use(express.json());

app.use("/user", routes);

app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`${port}`);
});

// app.set("view engine", "ejs")
