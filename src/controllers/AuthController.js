const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

class AuthController {
   async  handleRegister (req, res, next) {
      const username = req.body.username;
      const password = req.body.password;

      // check payload
      if(!username || !password) return res.sendStatus(401) //unauthorized

      // check for duplicate
      const founderUser = await User.findOne({ username: username })
      if (founderUser) return res.sendStatus(409)


         try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = bcrypt.hash(password)

            const newUser = new User({username, password: hashPassword});
            newUser.save()
            
            res.sendStatus(201).json("new user created !")
         } catch (err) {
            res.sendStatus(500).json({"message": err.message})
         }
   }

   async handleLogin (req, res) {
      const username = req.body.username;
      const password = req.body.password;

      // check payload
      if(!username, !password) return rs.sendStatus(401) // unauthorized

      try {
         // check username is in db
         const founderUser = User.findOne({where:{username: username}})
         if (!founderUser) res.sendStatus(401);

         // check password
         const isCorrectPassWord = await bcrypt.compare(password, founderUser.password)
         if (!isCorrectPassWord) return res.sendStatus(401);

         const {username, role_code} = founderUser

         //generate token 
         const token = jwt.sign({username}, "nguyenhuudat", {expiresIn: "30s"})
         const refreshToken = jwt.sign({username}, "nguyenhuudat", {expiresIn: "1d"})

         //update refresh token to user
         await User.updateOne({username: username}, {refresh_token: refreshToken})

         // response result
         res.cookie("jwt", refreshToken, {
               httpOnly: true,
               maxAge: 24 * 60 * 60 * 1000,
            });
         res.json({role: role_code, token: `bearer ${token}`})

      } catch (err) {
         res.sendStatus(500).json({"message": err.message})
      }
   }
}

module.exports = new AuthController();