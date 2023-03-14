const User = require("../models/User");
const jwt = require("jsonwebtoken")

const handleRefreshToken = async (req, res) => {
	const cookies = req.cookies

	if (!cookies.jwt) return res.sendStatus(401) // unauthorized

	const refreshToken = cookies.jwt

	// check is user in database
	const founderUser = await User.findOne({refresh_token: refreshToken})
	if (!founderUser) return res.sendStatus(403) //forbidden

	// check prev token
	const userInfo =  jwt.verify(refreshToken, "nguyenhuudat")	
	if (!userInfo || userInfo.username !== founderUser.username) return res.sendStatus(403) //forbidden

	// generate new token
	const accessToken = jwt.sign(
     {
        username: userInfo.username,
     },
     "nguyenhuudat",
     {
        expiresIn: "30s",
     }
  );

	res.json({token: `bearer ${accessToken}`})
}

module.exports =  handleRefreshToken