const express = require("express");

const userController = require("../controllers/user.js");

const auth = require("../middleware/auth");

const router = express.Router();

router.get("/profile", auth, userController.getUserProfile);

module.exports = router;
