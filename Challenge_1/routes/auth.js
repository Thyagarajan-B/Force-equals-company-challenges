const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const user = {
    username: "user1",
    password: bcrypt.hashSync("pass123", 10) // hashed password
};

router.post('/', (req, res) => {
    const { username, password } = req.body;
    if (username !== user.username || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
});

module.exports = router;
