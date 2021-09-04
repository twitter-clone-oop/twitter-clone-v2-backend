const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);

PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    console.log("DB Connected!");
    app.listen(PORT, () => {
      console.log(PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
