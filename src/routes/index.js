//router
const authRouter = require("./auth")
const productRouter = require("./products");
const adminRouter = require('./admin')
// controller

//middleWare
const TokenVerify = require("../middlewares/TokenVerify")

const route = function (app) {

   app.use("/api/products", productRouter)

   app.use("/api/auth", authRouter)

   // app.use(TokenVerify)

   app.use("/api/admin",TokenVerify, adminRouter)

   app.use("/",(req, res) => {
      res.json("404") //not found
   });

};

module.exports = route;
