const { body, validationResult } = require("express-validator");

const itemValidationRules = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name field is required."),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Category field is required."),
    body("price")
      .isNumeric()
      .withMessage("Price field must be a valid number."),
    body("stock")
      .isInt({ min: 0 })
      .withMessage("Stock field must be a positive integer."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description field is required."),
    body("sku")
      .trim()
      .isAlphanumeric()
      .isLength({ min: 5 })
      .withMessage("SKU must be alphanumeric and 5+ characters."),
    body("manufacturer")
      .trim()
      .notEmpty()
      .withMessage("Manufacturer field is required."),
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ validationErrors: errors.array() });
};

module.exports = { itemValidationRules, validate };
