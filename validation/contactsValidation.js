const Joi = require("joi");

const addContactValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(6).max(12).required(),
  });

  const validationResult = schema.validate(body);

  if (validationResult.error) {
    return validationResult;
  } else return false;
};

const updateContactValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().min(6).max(12).optional(),
  });

  const validationResult = schema.validate(body);

  if (validationResult.error) {
    return validationResult;
  } else return false;
};

module.exports = {
  addContactValidation,
  updateContactValidation,
};
