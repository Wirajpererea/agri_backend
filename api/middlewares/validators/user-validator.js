const { body, validationResult } = require("express-validator");

const userValidationRules = type => {
  return type === "create"
    ? [
        // userName not be empty
        body("userName").notEmpty(),
        // email must be an email
        body("email").isEmail(),
        // password must be at least 4 chars long
        body("password").isLength({ min: 4 }),
        // role not be empty
        body("roleId").notEmpty(),
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
  userValidationRules,
  validate
};
