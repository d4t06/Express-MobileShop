const authRouter = require("./auth")
const productRouter = require("./products");
const adminRouter = require('./admin')
const imageRouter = require('./image')

const route = function (app) {

   app.use("/api/products", productRouter)

   app.use("/api/auth", authRouter)

   app.use("/api/admin", adminRouter)

   app.use("/api/images", imageRouter)

   app.use("/",(req, res) => {
      res.json("404") //not found
   });

};

module.exports = route;
