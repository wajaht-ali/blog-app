import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import dotenv from 'dotenv';
dotenv.config();

const screte_KEY = process.env.screte_KEY;

const LoginController = async (req, res) => {
    const { email, password } = req.body;
    await UserModel.findOne({ email: email })
        .then(async (user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role, id: user._id }, screte_KEY, ({ expiresIn: "1h" }));
                        res.cookie('token', token, { httpOnly: true }); //, maxAge: 7200000
                        res.json({ status: true, role: user.role });
                    }
                    else {
                        res.json("Incorrect Password!");
                    }
                })
            }
            else {
                res.json("Record not found!");
            }
        })
        .catch((error) => {
            res.json(error);
        })
}

export default LoginController;