const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController");

// api/products
router.get("/", productsController.getProducts)

router.get("/search", productsController.search)

router.get("/:category/:key", productsController.getOne)

module.exports = router;
