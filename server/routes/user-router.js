const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/user-controllers");

const multer = require("multer");
const upload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersController.getUser);

router.post(
  "/signup",
  upload.single("avatar"),
  [
    check("username").not().isEmpty().isLength({ min: 4 }),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.patch("/:id", usersController.updateUser);

module.exports = router;
