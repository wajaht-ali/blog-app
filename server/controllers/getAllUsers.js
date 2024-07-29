import UserModel from "../models/UserModel.js";

export const GetAllUsers = async (req, res) => {
    UserModel.find()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            res.json(error);
        })
}

//get single user
export const GetSingleUser = async (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then((user) => {
            res.status(201).send({
                success: true,
                message: "User fetched successfully!",
                user,
            })
        })
        .catch((error) => {
            res.status(400).send({
                success: true,
                message: "Error while fetching user!",
                error,
            })
        })
}