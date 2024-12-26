const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.HOST,   // Replace with your MySQL host
    user: process.env.USER,        // Replace with your MySQL user
    password: process.env.PASSWORD,// Replace with your MySQL password
    database: process.env.DATABASE     // Replace with your MySQL database name
});


db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database as id ' + db.threadId);
  });
  
module.exports = db;
  