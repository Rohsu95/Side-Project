const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const placesRouter = require("./routes/place-router");
const userRouter = require("./routes/user-router");

const HttpError = require("./models/error");

const dotenv = require("dotenv");

const app = express();

dotenv.config();

app.use(bodyParser.json());

app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/places", placesRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  const error = new HttpError("app.js 에러.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req?.file) {
    fs?.unlink(req?.file?.path, (err) => {
      // console.log("unlink 부분", err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message });
});

mongoose
  .connect(process.env.MONGO_URL)

  .then(() => {
    app.listen(process.env.PORT || 8000);
    console.log("몽구스 연결 성공");
  })
  .catch((err) => {
    console.log("몽구스 연결 에러", err);
  });
