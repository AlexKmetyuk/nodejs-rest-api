const fs = require("fs");
const path = require("path");
const jimp = require("jimp");

const { updateUserAvatar } = require("../services/userServices");

const AVATARS_DIR = path.resolve("./public/avatars");

const updateCurrentAvatarController = async (req, res) => {
  if (!req.file) {
    throw new Error("File is missing!");
  }
  const avatarUrl = req.file.path;
  const newAvatarUrl = path.join(AVATARS_DIR, req.file.filename);

  const img = await jimp.read(avatarUrl);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(avatarUrl);
  await fs.rename(avatarUrl, newAvatarUrl, (err) => {
    if (err) {
      throw new Error(err);
    }
  });
  updateUserAvatar(req.user._id, newAvatarUrl);

  res.json({ avatarURL: newAvatarUrl });
};

module.exports = {
  updateCurrentAvatarController,
};
