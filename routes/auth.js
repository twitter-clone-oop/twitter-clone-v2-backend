const express = require("express");

const router = express.Router();

const { body } = require("express-validator");
const User = require("../models/User");

const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("firstName").trim().not().isEmpty(),
    body("lastName").trim().not().isEmpty(),
    body("userName").trim().not().isEmpty(),
    body("email")
      .isEmail()
      .custom(async (value, { req }) => {
        const userCount = await User.find({ email: value }).countDocuments();

        if (userCount !== 0) {
          const error = new Error("User already exists!");
          error.code = 401;
          throw error;
        }

        return true;
      }),
    body("password").trim().isLength({ min: 5 }),
  ],
  authController.signup
);

router.post("/login", authController.signin);

router.get("/check", authController.getCheck);

module.exports = router;
