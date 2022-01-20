const { body, validationResult } = require("express-validator");

const apartmentComplexValidationRules = type => {
  return type === "create"
    ? [
        // complexName not be empty
        body("complexName").notEmpty(),
        // complexAddress not be empty
        body("complexAddress").notEmpty(),
        // createdBy not be empty
        body("createdBy").notEmpty()
      ]
    : [
        // apartmentComplexId not be empty
        body("apartmentComplexId").notEmpty(),
        // updated not be empty
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
  apartmentComplexValidationRules,
  validate
};
