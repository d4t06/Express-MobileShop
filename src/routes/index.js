//router
const authRouter = require("./auth")
const productRouter = require("./products");
const adminRouter = require('./admin')
// controller

//middleWare
const TokenVerify = require("../middlewares/TokenVerify")
const PaginationMiddleware = require("../middlewares/PaginationMiddleware")
const SortMiddleWare = require("../middlewares/SortMiddleware")

const route = function (app) {

   app.use("/api/products", productRouter)

   app.use("/api/auth", authRouter)

   app.use(TokenVerify)

   app.use("/api/admin", adminRouter)

   app.use("/",(req, res) => {
      res.sendStatus(404) //not found
   });

};

module.exports = route;
