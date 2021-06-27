const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(12).required(),
    favorite: Joi.boolean().optional().default(false),
  });

  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    return res
      .status(400)
      .json({ status: validationResult.error.details[0].message });
  }

  next();
};

const updateContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().min(6).max(12).optional(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res
      .status(400)
      .json({ status: validationResult.error.details[0].message });
  }

  next();
};

const updateContactStatusValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  updateContactStatusValidation,
};
