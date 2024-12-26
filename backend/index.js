const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes.js");

require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use('/api', userRouter);

app.listen(7777, () => {
    console.log("server started on port" + process.env.PORT);
});