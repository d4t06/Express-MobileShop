const jwt = require("jsonwebtoken")

const TokenVerify = (req, res) => {
    if (!req.headers.authorization) return res.sendStatus(401) //Unauthorized

    const token = req.headers.authorization.split("")[1];

    const cookie = req.cookie
    if (!cookie.jwt) return res.sendStatus(401)
    const jwt = cookie.jwt
    
    try {
        const userInfo = jwt.verify(token, "nguyenhuudat")

        req.userInfo = userInfo
        next()
    } catch (error) {
        res.sendStatus(403) // forbidden
    }
}

module.exports = TokenVerify