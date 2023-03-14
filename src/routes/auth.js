const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");


router.post("/login", AuthController.handleLogin);

router.post("/register", AuthController.handleRegister);

module.exports = router;
