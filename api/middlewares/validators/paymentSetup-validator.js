const { body, validationResult } = require("express-validator");

const paymentSetupValidationRules = type => {
  return type === "create"
    ? [
        // userName not be empty
        body("aprtmentComplexId").notEmpty(),
        // email must be an email
        body("aprtmentComplexRowId").notEmpty(),
        // createdBy not be empty
        body("createdBy").notEmpty()
      ]
    : [
        // userId not be empty
        body("userId").notEmpty(),
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
  paymentSetupValidationRules,
  validate
};
