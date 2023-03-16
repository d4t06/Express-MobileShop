const User = require("../models/User");

class AdminController {
    async getUser(req, res)  {
      try {
         const users = await User.find({})
         res.json(users)
      } catch (error) {
         res.status(500).json("loi server")
      }

    }
}

module.exports = new AdminController();
