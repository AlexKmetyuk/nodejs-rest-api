const { CustomError } = require("./errors");
asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};
errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: error.message });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
