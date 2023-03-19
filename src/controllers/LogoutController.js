const User = require('../models/User');

module.exports = handleLogout = async (req, res) => {
   const cookies = req.cookies;

   if (!cookies.jwt) return res.sendStatus(204); // no content

   const refreshToken = cookies.jwt;
   const founderUser = await User.findOne({ refresh_token: refreshToken });

   if (!founderUser) {
      res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204); // no content
   }

   // clear refresh token and cookies
   await User.updateOne(
      { username: founderUser.username },
      { refresh_token: null }
   );
   res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
   return res.sendStatus(204);
};
