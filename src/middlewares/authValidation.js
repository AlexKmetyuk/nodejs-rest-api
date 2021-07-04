const Joi = require("joi");

const { ValidationError } = require("../helpers/errors");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message);
  }

  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.details[0].message);
  }

  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
