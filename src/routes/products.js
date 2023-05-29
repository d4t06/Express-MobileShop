const express = require("express");
const router = express.Router();
const productsController = require("../controllers/ProductsController");

const SortMiddleWare = require("../middlewares/SortMiddleware")
const PaginationMiddleware = require("../middlewares/PaginationMiddleware")

router.use(SortMiddleWare)
router.use(PaginationMiddleware)

router.get("/search", productsController.search)

router.get("/suggest", productsController.getSuggest)

router.get("/:category", productsController.getProducts)

router.get("/:category/:key", productsController.getDetail)

module.exports = router;
