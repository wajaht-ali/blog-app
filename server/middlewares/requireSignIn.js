import jwt from "jsonwebtoken";

export const requireSignIn = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
        return res.status(201).send({
            success: true,
            message: "Please Login first."
        })
    }
    else {
        jwt.verify(token,  process.env.screte_KEY, (err, decode) => {
            if (err) {
                return res.status(201).send({
                    success: true,
                    message: err
                })
            }
            else {
                req.email = decode.email;
                req.role = decode.role;
                // req.name = decode.name;
                req._id = decode._id;
                next();
            }
        })
    }
}