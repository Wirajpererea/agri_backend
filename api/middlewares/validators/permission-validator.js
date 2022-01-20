const { body, validationResult } = require('express-validator');

const permissionValidationRules = (type) => {
  return type === 'create'
    ? [
        // permissionName not be empty
        body('permissionName').notEmpty(),
        // permssionUserId must be an email
        body('permssionUserId').isEmail(),
        // roleId must be at least 4 chars long
        body('roleId').isLength({ min: 4 }),
        // permissionData not be empty
        body('permissionData').notEmpty(),
        // permissionType not be empty
        body('permissionType').notEmpty(),
        // createdBy not be empty
        body('createdBy').notEmpty(),
      ]
    : [
        // userId not be empty
        body('permissionId').notEmpty(),
        // updatedby not be empty
        body('updatedBy').notEmpty(),
      ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  permissionValidationRules,
  validate,
};
