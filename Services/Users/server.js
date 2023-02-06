const express = require('express');
const app = express();
require('dotenv').config();

app.set("view engine", "ejs")
const userRouter = require('./routes/routing.js');

app.use(
    '/users', userRouter,
);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`${port}`);
})