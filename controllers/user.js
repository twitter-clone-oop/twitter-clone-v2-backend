const User = require("../models/User.js");

exports.getUserProfile = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);

  res.json(user);
};
