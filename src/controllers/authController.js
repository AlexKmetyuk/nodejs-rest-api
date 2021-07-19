const {
  signup,
  login,
  logout,
  signupVerification,
  signupVerificationByEmail,
} = require("../services/authServices");

const signupController = async (req, res) => {
  const { email, password } = req.body;
  const user = await signup(email, password);

  res.json({
    s: "success",
    user: { email: user.email, subscription: user.subscription },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const token = await login(email, password);
  res.json({ s: "success", token: token });
};

const logoutController = async (req, res) => {
  const result = await logout(req.user._id);
  res.status(204).json({ status: "no content" });
};

const signupVerificationController = async (req, res) => {
  const { verificationToken } = req.params;

  await signupVerification(verificationToken);
  res.status(200).json({ status: "registration success" });
};
const signupVerificationByEmailController = async (req, res) => {
  const { email } = req.body;

  await signupVerificationByEmail(email);
  res.status(200).json({ status: "Email sent" });
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  signupVerificationController,
  signupVerificationByEmailController,
};
