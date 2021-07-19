const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var gravatar = require("gravatar");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");

const { User } = require("../db/userModel");
const { NotAuthorizedError } = require("../helpers/errors");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hw06goit@gmail.com",
    pass: "Nodemailer",
  },
});

const signup = async (email, password) => {
  try {
    const user = new User({
      email,
      password: await bcrypt.hash(password, 10),
      avatarURL: gravatar.url(email),
      verifyToken: uuidv4(),
    });
    await user.save();

    const message = {
      from: "HW 06 GOIT <hw06goit@gmail.com>",
      to: email,
      subject: "Thank you for registration!",
      text: `Please confirm your email address POST http://localhost:3000/api/users/verify/${user.verifyToken}`,
      html: `Please confirm your email address POST http://localhost:3000/api/users/verify/${user.verifyToken}`,
    };

    await transporter.sendMail(message).catch((error) => {
      console.error(error);
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const login = async (email, password) => {
  const user = await User.findOne({ email, verify: true });
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
    { new: true, omitUndefined: true, useFindAndModify: false }
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
    return logoutUser;
  } catch (error) {
    throw new Error(error);
  }
};

const signupVerification = async (verifyToken) => {
  const verify = await User.findOne({ verifyToken, verify: false });

  if (!verify) {
    throw new NotAuthorizedError("Invalid or expired confirmation code");
  }
  const user = await User.findOne({ verifyToken });
  if (!user) {
    throw new NotAuthorizedError("No user found ");
  }
  await verify.save();
  user.verifyToken = "Verificated!";
  user.verify = true;
  console.log(user);
  await user.save();

  const message = {
    from: "HW 06 GOIT <hw06goit@gmail.com>",
    to: user.email,
    subject: "Confirmed registration",
    text: "Thank you for registration!",
    html: "<h1>Thank you for registration!</h1>",
  };

  await transporter.sendMail(message).catch((error) => {
    console.error(error);
  });
};

const signupVerificationByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (user.verify === true) {
      throw new NotAuthorizedError("Verification has already been passed");
    }
    const message = {
      from: "HW 06 GOIT <hw06goit@gmail.com>",
      to: email,
      subject: "Thank you for registration!",
      text: `Please confirm your email address POST http://localhost:3000/api/users/verify/${user.verifyToken}`,
      html: `Please confirm your email address POST http://localhost:3000/api/users/verify/${user.verifyToken}`,
    };

    await transporter.sendMail(message).catch((error) => {
      console.error(error);
    });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  signup,
  login,
  logout,
  signupVerification,
  signupVerificationByEmail,
};
