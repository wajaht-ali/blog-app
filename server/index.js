import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.js";
import { PostRouter } from "./routes/posts.js";
import { AdminRouter } from "./routes/admin.js";
import { ApplyRouter } from "./routes/apply.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const db_URI = process.env.db_URI;

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("assets"));

mongoose.connect(db_URI)

app.use("/auth", UserRouter);
app.use("/posts", PostRouter);
app.use('/apply', ApplyRouter)
app.use("/admin", AdminRouter);


app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT}`);
})