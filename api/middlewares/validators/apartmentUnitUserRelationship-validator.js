const { body, validationResult } = require("express-validator");

const apartmentUnitUserRelationshipValidationRules = type => {
  return type === "create"
    ? [
        // aprtmentUnitRowId not be empty
        body("apartmentUnitRowId").notEmpty(),
        // aprtmentUnitId not be empty
        body("apartmentUnitId").notEmpty(),
        // unitTypeName not be empty
        body("apartmentUserId").notEmpty(),
        // createdBy not be empty
        body("createdBy").notEmpty()
      ]
    : [
        // apartmentUnitUserRelationshipId not be empty
        body("apartmentUnitUserRelationshipId").notEmpty(),
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
  apartmentUnitUserRelationshipValidationRules,
  validate
};
