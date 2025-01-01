const bcrypt = require('bcryptjs');
const db = require("../db.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_KEY, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

const registerUser = async (req, res) => {
    try {
        const { userPassword, userName } = req.body;
        const hashedPassword = await bcrypt.hash(userPassword, 5);
        const q = 'INSERT INTO nail_master.users (userName, userPassword) VALUES (?, ?)';
        db.query(q, [userName, hashedPassword], (err) => {
            if(err) return res.status(500).send("Имя пользователя занято")
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
        
        const token = req.headers['authorization'];

        db.query(q, [userName], async (err, data) => {
            if(err) return res.status(500).send("Server error");
            if(data.length === 0) return res.status(400).send("Неверное имя пользователя");

            const user = data[0];
            const isValid = await bcrypt.compare(userPassword, user.userPassword);
            if(!isValid) return res.status(400).send("Неверный пароль")
            
            const {accessToken, refreshToken} = generateTokens(user.userId)

            const selectQuery = "SELECT * FROM tokens WHERE userId = ?";
            db.query(selectQuery, [user.userId], async (err, data) => {
                if(err) return res.status(500).send("Ошибка сервера");
                let query = "";
                
                if(data[0]){
                    query = "UPDATE tokens SET token = ? WHERE userId = ?";

                    db.query(query, [refreshToken, user.userId], (err) => {
                        if(err) return res.status(500).send("Ошибка сервера");
                    });
                } else {
                    query = "INSERT INTO tokens (userId, token) VALUES (?, ?)";
                    db.query(query, [user.userId, refreshToken], (err) => {
                        if(err) return res.status(500).send("Ошибка сервера");
                    })
                }
            });

            res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true});
            res.cookie("accessToken", accessToken, {httpOnly: true, secure: true});
            res.status(200).send(user);
        });
    } catch (err) {
        console.log(err);
    }
};

const logoutUser = async (req,res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).send('Logged out successfully');
}



module.exports = {
    registerUser, 
    loginUser,
    logoutUser 
    
}