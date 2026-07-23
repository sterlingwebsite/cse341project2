const { body, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    body("firstName").notEmpty().withMessage("First name is required."),
    body("lastName").notEmpty().withMessage("Last name is required."),
    body("email").isEmail().withMessage("Must be a valid email address."),
    body("role").notEmpty().withMessage("User role is required."),
    body("organization").notEmpty().withMessage("Organization is required."),
    body("phoneNumber").notEmpty().withMessage("Phone number is required."),
    body("isActive")
      .isBoolean()
      .withMessage("isActive must be a boolean value."),
  ];
};

const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  userValidationRules,
  validateUser,
};
