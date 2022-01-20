const { body, validationResult } = require("express-validator");

const apartmentBlockValidationRules = type => {
  return type === "create"
    ? [
        // blockName not be empty
        body("blockName").notEmpty(),
        // apartmentComplexRowId not be empty
        body("apartmentComplexRowId").notEmpty(),
        // apartmentComplexId not be empty
        body("apartmentComplexId").notEmpty(),
        // createdBy not be empty
        body("createdBy").notEmpty()
      ]
    : [
        // apartmentBlockId not be empty
        body("apartmentBlockId").notEmpty(),
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
  apartmentBlockValidationRules,
  validate
};
