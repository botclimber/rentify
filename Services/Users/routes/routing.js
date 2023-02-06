const express = require('express');
const router = express.Router();
const User = require('../modules/User.js');

router.get('/', (req, res) => {
    res.json("Ola");
})

router.use(express.json());

router.post('/', (req, res) => {
    //const user = new User(req.body.username, req.body.password);
    const user = { username: req.body.username, password: req.body.password }
    console.log(user);
    //user.insert(user);
    res.status(201);
})

module.exports = router;