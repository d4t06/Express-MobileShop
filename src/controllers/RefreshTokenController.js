const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
   const cookies = req.cookies;

   if (!cookies.jwt) return res.sendStatus(401); // unauthorized

   const refreshToken = cookies.jwt;

   // check is user in database
   const founderUser = await User.findOne({ refresh_token: refreshToken });
   if (!founderUser) {
      console.log('no user in db');
      return res.sendStatus(403);
   } //forbidden

   // check prev token
   jwt.verify(refreshToken, 'nguyenhuudat', async (err, decode) => {
      if (err) {
         console.log('token expired');
         return res.sendStatus(403);
      }

      console.log("refresh token",decode.username, decode.role_code)


      if (decode.username !== founderUser.username) return res.sendStatus(403); //forbidden

      // generate new token
      const newToken = jwt.sign(
         {
            "username": decode.username,
            "role_code": decode.role_code,
         },
         'nguyenhuudat',
         {
            expiresIn: '10s',
         }
      );

      const newRefreshToken = jwt.sign(
         {
            "username": founderUser.username,
            "role_code": founderUser.role_code,
         },
         'nguyenhuudat',
         {
            expiresIn: '1d',
         }
      );

      // update newRefreshToken to current user
      // User.updateOne({username: founderUser.username},{refresh_token: newRefreshToken})
      founderUser.refresh_token = newRefreshToken;
      await founderUser.save();

      // create secure cookie
      res.cookie('jwt', newRefreshToken, {
         httpOnly: true,
         sameSite: 'none',
         secure: true,
         maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({ token: newToken });
   });
};

module.exports = handleRefreshToken;
