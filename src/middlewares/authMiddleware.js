const jwt = require("jsonwebtoken");

const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../helpers/errors");
const { getCurrentUser } = require("../services/userServices");

const authMiddleware = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers["authorization"].split(" ");
    if (!token) {
      next(NotAuthorizedError("Not authorized"));
      return;
    }
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
      next(NotAuthorizedError("Not authorized"));
      return;
    }
    req.token = token;
    req.user = user;
    const currentUser = await getCurrentUser(user._id);
    if (token !== currentUser.token) {
      next(new NotAuthorizedError("Not authorized"));
      return;
    }

    next();
  } catch (error) {
    next(NotAuthorizedError("Not authorized"));
    return;
  }
};

module.exports = { authMiddleware };
