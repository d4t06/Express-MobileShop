const User = reqire("../models/User");
const jwt = reqire("jsonwebtoken")

const handleRefreshToken = async (req, res) => {
	const cookie = req.cookie
	if (!cookie.jwt) return res.sendStatus(401) // unauthorized

	const refreshToken = cookie.jwt

	// check is user in database
	const founderUser = User.findOne({where: {refresh_token: refreshToken})
	if (!founderUser) return res.sendStatus(403) //forbidden

	// check prev token
	const userInfo = jwt.verify(refreshToken, "nguyenhuudat")	
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

	res.json({accessToken})
}