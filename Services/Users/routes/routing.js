const express = require('express');
const router = express.Router();
const User = require('../modules/User.js');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.json("Ola");
})

router.use(express.json());

const users = [];


router.post('/', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //const user = new User(req.body.username, req.body.password);
        users.push({ username: req.body.username, password: hashedPassword });
        console.log(users);
        //user.insert(user);
    } catch {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

router.post('/login', async (req, res) => {
    console.log(users);
    const user = users.find(user => user.username === req.body.username);
    console.log(user);
    if (user == null) {
        return res.status(404).json({ message: "User not found" })
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
        } else {
            res.send('Failed')
        }
    } catch {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = router;