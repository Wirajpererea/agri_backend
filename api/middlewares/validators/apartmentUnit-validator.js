const { body, validationResult } = require("express-validator");

const apartmentUnitValidationRules = type => {
  return type === "create"
    ? [
        // unitName not be empty
        body("unitName").notEmpty(),
          // apartmentUnitTypeRowId not be empty
        body("apartmentUnitTypeRowId").notEmpty(),
        // apartmentUnitTypeId not be empty
        body("apartmentUnitTypeId").notEmpty(),
         // apartmentBlockRowId not be empty
        body("apartmentBlockRowId").notEmpty(),
        // apartmentBlockId not be empty
        body("apartmentBlockId").notEmpty(),
        // createdBy not be empty
        body("createdBy").notEmpty()
      ]
    : [
        // apartmentUnitId not be empty
        body("apartmentUnitId").notEmpty(),
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
  apartmentUnitValidationRules,
  validate
};
