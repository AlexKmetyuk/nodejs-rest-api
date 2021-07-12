const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var gravatar = require("gravatar");

const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../helpers/errors");

const signup = async (email, password) => {
  try {
    const user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      avatarURL: gravatar.url(email),
    });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  await User.findOneAndUpdate(
    { email },
    { $set: { token: token } },
    { new: true, omitUndefined: true }
  );

  return token;
};

const logout = async (userId) => {
  if (!userId) {
    throw new NotAuthorizedError("You must be authorized!");
  }
  try {
    const logoutUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { token: null } },
      { useFindAndModify: false }
    );
    console.log(logoutUser);
    return logoutUser;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
};
