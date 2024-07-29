import dotenv from "dotenv";
import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import LoginController from "../controllers/login_controller.js";
import RegisterController from "../controllers/register_controller.js";
import { GetAllUsers, GetSingleUser } from "../controllers/getAllUsers.js";
import { verifyAuthor } from "../middlewares/verifyAuthor.js";
import { newsLetterController } from "../controllers/newsletterController.js";

// import { verifyAdmin } from "../middlewares/verifyAdmin.js";

dotenv.config();
const router = express.Router();
// const screte_KEY = process.env.screte_KEY;

router.post("/registerUser", RegisterController);

router.get("/", verifyUser, (req, res) => {
  res.status(201).send({ email: req.email, role: req.role });
});

router.post("/loginUser", LoginController);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json("Success");
});

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ role: req.role, status: true, message: "Success" });
});

router.post("/newsletter", newsLetterController);

router.get("/verifyAdmin", verifyAdmin, (req, res) => {
  res.json({ message: "Success", id: req._id });
});

router.get("/verifyAuthor", verifyAuthor, (req, res) => {
  res.json({ message: "Success", id: req._id });
});

router.get("/users", GetAllUsers);

router.get("/get-single-user/:id", GetSingleUser);
export { router as UserRouter };
