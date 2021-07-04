const { signup, login, logout } = require("../services/authServices");

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

module.exports = {
  signupController,
  loginController,
  logoutController,
};
