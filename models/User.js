const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  procilePic: {
    type: String,
    default: "/images/user.png",
  },
  coverPhoto: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
