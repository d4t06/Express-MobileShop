const express = require("express");
const router = express.Router();
const multer = require("multer");

const ImageController = require("../controllers/ImageController");

// const TokenVerify = require("../middlewares/TokenVerify");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // return;
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // console.log("req =", req.file);

    // cb(null, `${req.body.href}.jpg`);
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// router.use(TokenVerify)

router.get("/", ImageController.getImages);

router.post("/", upload.single("image"), ImageController.addOne);

router.get("/delete/:fileName", ImageController.deleteOne)
// upload.single("image") image == field in input

module.exports = router;
