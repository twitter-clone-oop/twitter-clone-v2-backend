const express = require("express");

const router = express.Router();

const { body } = require("express-validator");
const User = require("../models/User");

const authController = require("../controllers/auth");

router.post("/signup", authController.signup);

// router.post("/login", authController.signin);

module.exports = router;
