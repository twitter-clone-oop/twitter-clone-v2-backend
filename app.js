const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use(bodyParser.json());

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
