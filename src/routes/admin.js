const express = require("express");
const router = express.Router();
const multer = require("multer");
const AdminController = require("../controllers/AdminController");
const ProductsController = require("../controllers/ProductsController");
const TokenVerify = require("../middlewares/TokenVerify");

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      // return;
      cb(null, "./uploads");
   },
   filename: function (req, file, cb) {
      // return;
      cb(null, `${req.body.href}.jpg`);
   },
});

const upload = multer({ storage: storage });

// router.use(TokenVerify)

router.get("/products/delete/:href", AdminController.deleteOne);

router.get("/products", AdminController.getProducts);

router.get("/products/:href", AdminController.getOne);

router.post("/products", upload.single("image"), AdminController.addOne);

router.post(
   "/products/edit",
   upload.array(),
   AdminController.updateOne
);

module.exports = router;
