import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { UserRouter } from "./routes/user.js";
import { PostRouter } from "./routes/posts.js";
import { AdminRouter } from "./routes/admin.js";
import { ApplyRouter } from "./routes/apply.js";
import { requireSignIn } from "./middlewares/requireSignIn.js";
import { chatRouter } from "./routes/chat.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const db_URI = process.env.db_URI;

app.use(
  cors({
    origin: ["https://blog-app-ui-lime.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
app.use("/assets", express.static(path.join(__dirname, "server/assets")));

mongoose.connect(db_URI);

app.use("/auth", UserRouter);
app.use("/posts", PostRouter);
app.use("/apply", requireSignIn, ApplyRouter);
app.use("/admin", AdminRouter);
app.use("/chat", chatRouter);

app.get("/", (req, res) => {
  res.send({ message: "Server is running ✅, Home route is clear 👍" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});
