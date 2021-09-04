const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    passwrod: hashedPassword,
  });

  await user.save();
  res.status(201).json({ message: "Successfully signed up!" });
};

exports.login = async (req, res, next) => {};
