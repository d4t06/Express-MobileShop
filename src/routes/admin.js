const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController")
const ProductsController = require("../controllers/ProductsController")

router.get("/users", AdminController.getUser);

router.post("/products", ProductsController.addProduct)

module.exports = router;
