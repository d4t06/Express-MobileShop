const User = require("../models/User")

const handleLogout = async (req, res) => {
	const cookie = req.cookie

	if(!cookie.jwt) return res.sendStatus(204) // no content

	const refreshToken = cookie.token

	const founderUser = User.findOne({where:{refresh_token:refreshToken}})
	if (!founderUser) {
		res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
		return res.sendStatus(204) // no content
	}

	// update user
	User.updateOne({username: founderUser.username}, {refresh_token: null})
	res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
}
	module.export = {handleLogout}