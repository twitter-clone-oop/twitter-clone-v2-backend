const express = require("express");

const path = require("path");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();

const auth = require("./middleware/auth.js");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, PUT, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.log("ERROR ERROR ERROR");
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  res.status(status).json({ message });
});

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
