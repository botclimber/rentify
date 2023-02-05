const express = require('express');
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const userRouter = require('./routes/users');

app.use(
    '/users', userRouter,
);

app.set("view engine", "ejs")

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`${port}`);
})




