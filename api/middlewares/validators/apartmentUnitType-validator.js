const { body, validationResult } = require("express-validator");

const apartmentUnitTypeValidationRules = type => {
  return type === "create"
    ? [
        // unitTypeName not be empty
        body("unitTypeName").notEmpty(),
        // createdBy not be empty
        body("createdBy").notEmpty()
      ]
    : [
        // apartmentUnitTypeId not be empty
        body("apartmentUnitTypeId").notEmpty(),
        // updatedby not be empty
        body("updatedBy").notEmpty()
      ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  apartmentUnitTypeValidationRules,
  validate
};
