import jwt from "jsonwebtoken";
const screte_KEY = process.env.screte_KEY;

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.json({message: "Token not available"});
    }
    else {
        jwt.verify(token, screte_KEY, (err, decode) => {
            if(err) {
                return res.json("Error with token");
            }
            else {
                if(decode.role === 'admin') {
                    // req.role = decode.role;
                    req._id = decode.id;
                    // req.email = decode.email;
                    next();
                }
                else {
                    return res.json({message: "not admin"});
                }
            }
        })
    }
}