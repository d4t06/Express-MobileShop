const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController");
// middleware
const SortMiddleWare = require("../middlewares/SortMiddleware")
const PaginationMiddleware = require("../middlewares/PaginationMiddleware")

router.use(SortMiddleWare)
router.use(PaginationMiddleware)

//api/products
router.get("/", productsController.getProducts)

router.get("/search", productsController.search)

router.get("/:category/:key", productsController.getOne)

module.exports = router;
