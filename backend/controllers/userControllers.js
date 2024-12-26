const bcrypt = require('bcryptjs');
const db = require("../db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        const { userPassword, userName } = req.body;
        const hashedPassword = await bcrypt.hash(userPassword, 5);
        const q = 'INSERT INTO nail_master.users (userName, userPassword) VALUES (?, ?)';
        db.query(q, [userName, hashedPassword], (err) => {
            if(err) return res.status(500).send("Server error")
            res.status(201).send("User registered");
        });
    } catch (err) {
        console.log(err);
    }
};

const loginUser = async (req, res) => {
    try {
        const {userPassword, userName} = req.body;
        const q = 'SELECT * FROM users WHERE userName = ?';

        db.query(q, [userName], async (err, data) => {
            if(err) return res.status(500).send("Server error");
            if(data.length === 0) return res.status(400).send("Invalid username");

            const user = data[0];
            const isValid = await bcrypt.compare(userPassword, user.userPassword);
            if(!isValid) return res.status(400).send("Invalid password")
            
            const token = jwt.sign({id: user.userId}, process.env.JWT_SECRET_KEY, {expiresIn: "1h"});
            res.cookie('token', token, { httpOnly: true, secure: false });
            res.status(200).send('Logged in successfully');
        });
    } catch (err) {
        console.log(err);
    }
};

const logoutUser = async (req,res) => {
    res.clearCookie('token');
    res.status(200).send('Logged out successfully');
}

module.exports = {
    registerUser, 
    loginUser,
    logoutUser
}