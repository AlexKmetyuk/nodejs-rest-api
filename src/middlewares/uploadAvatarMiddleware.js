const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, path.resolve("./tmp"));
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${req.user._id}.${extension}`);
  },
});

const uploadAvatarMiddleware = multer({ storage });

module.exports = {
  uploadAvatarMiddleware,
};
