import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDB from "./database/connectDatabase.js";

import userRoute from "./routes/userRoutes.js"
import toDoListRoute from "./routes/toDoListRoute.js"


import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT

app.get("/", (req, res) => {
    res.json({
        message: ("hello")
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/user", userRoute)
app.use("/api/user/toDoList", toDoListRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})