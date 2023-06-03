const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/AdminController");
const ProductsController = require("../controllers/ProductsController");

const TokenVerify = require("../middlewares/TokenVerify");
// router.use(TokenVerify)

router.get("/products/delete/:href", AdminController.deleteOne);

router.get("/products", AdminController.getProducts);

router.get("/products/:href", AdminController.getOne);

router.post("/products", AdminController.addOne);

router.post(
   "/products/edit",
   AdminController.updateOne
);

module.exports = router;
