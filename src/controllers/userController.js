const { getCurrentUser } = require("../services/userServices");

const getCurrentUserController = async (req, res) => {
  const { _id: userId } = req.user;
  const currentUser = await getCurrentUser(userId);
  res.status(200).json({
    email: currentUser.email,
    subscription: currentUser.subscription,
  });
};

module.exports = {
  getCurrentUserController,
};
