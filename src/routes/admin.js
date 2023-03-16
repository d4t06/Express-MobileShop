const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController")

router.get("/users", AdminController.getUser);

module.exports = router;
