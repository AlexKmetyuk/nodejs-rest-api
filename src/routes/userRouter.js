const express = require("express");
const { getCurrentUserController } = require("../controllers/userController");
const router = express.Router();

const { asyncWrapper } = require("../helpers/apiHelpers");

const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/current", authMiddleware, asyncWrapper(getCurrentUserController));

module.exports = router;
