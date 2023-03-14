// model
const User = require("../models/User")
//router
const authRouter = require("./auth")
// controller
const productRouter = require("./products");
//middleWare
const TokenVerify = require("../middlewares/TokenVerify")
const PaginationMiddleware = require("../middlewares/PaginationMiddleware")
const SortMiddleWare = require("../middlewares/SortMiddleware")


const route = function (app) {

   app.use("/api/products", PaginationMiddleware, SortMiddleWare, productRouter)

   app.use("/api/auth", authRouter)

   app.use(TokenVerify)

   app.get("/users", (req, res) => {
      User.find({})
      .then(data => res.json(data))
      .catch(err => res.status(500).json(err))
   })

   app.use("/",(req, res) => {
      res.sendStatus(404) //not found
   });

};

module.exports = route;
