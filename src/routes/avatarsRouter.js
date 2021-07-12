const express = require("express");
const path = require("path");
const multer = require("multer");
const router = express.Router();

const {
  updateCurrentAvatarController,
} = require("../controllers/avatarsController");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  uploadAvatarMiddleware,
} = require("../middlewares/uploadAvatarMiddleware");

router.patch(
  "/avatars",
  authMiddleware,
  uploadAvatarMiddleware.single("avatar"),
  asyncWrapper(updateCurrentAvatarController)
);

module.exports = router;
