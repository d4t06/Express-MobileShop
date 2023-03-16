const jwt = require("jsonwebtoken")

const TokenVerify = (req, res, next) => {
    console.log("token middleware pass");
    if (!req.headers.authorization) return res.sendStatus(403); //forbidden

    const token = req.headers.authorization.split(" ")[1];

    try {
        jwt.verify(token, "nguyenhuudat", (err, decode) => {
            if (err) return res.sendStatus(403);
            req.userInfo = decode.username;
            next();
        })
    } catch (error) {
        res.status(401).json({message: error.message}); // Unauthorized
    }
}

module.exports = TokenVerify