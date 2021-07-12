const express = require("express");
const router = express.Router();

const {
  loginController,
  signupController,
  logoutController,
} = require("../controllers/authController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/authValidation");
const { authMiddleware } = require("../middlewares/authMiddleware");

///

router.post("/signup", signupValidation, asyncWrapper(signupController));

router.post("/login", loginValidation, asyncWrapper(loginController));

router.post("/logout", authMiddleware, asyncWrapper(logoutController));

module.exports = router;
