const { errorHandler } = require('../../helpers');

const postValidation = (req, res, next) => {
  req.checkBody('name')
    .exists()
    .withMessage('Name doesn\'t exist')
    .notEmpty()
    .withMessage('Name empty')
    .isString()
    .withMessage('Name not a string');

  req.checkBody('email')
    .exists()
    .withMessage('Email doesn\'t exist')
    .notEmpty()
    .withMessage('Email empty')
    .isEmail()
    .withMessage('Email not valid');


  req.checkBody('password')
    .exists()
    .withMessage('Password doesn\'t exist')
    .notEmpty()
    .withMessage('Password is empty')
    .isString()
    .withMessage('Password should be a string');

  req.checkBody('cpassword')
    .exists()
    .withMessage('Password confirmation doesn\'t exist')
    .notEmpty()
    .withMessage('Password confirmation is empty')
    .isString()
    .withMessage('Password confirmation should be a string')
    .custom((value) => {
      if (!req.body.cpassword || !req.body.password) return false;

      return req.body.cpassword !== req.body.password ? false : value;
    })
    .withMessage('Password doesn\'t equal confirmation password');

  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()));
      }

      next();
    });
};

const deleteValidation = (req, res, next) => {
  req.checkParams('id')
    .exists()
    .notEmpty()
    .withMessage('Id didn\'t provide');

  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()));
      }

      next();
    });
};

const putValidation = (req, res, next) => {
  if (req.body.name) {
    req.checkBody('name')
      .notEmpty()
      .withMessage('Name is emapty');
  }

  if (req.body.email) {
    req.checkBody('email')
      .isEmail()
      .withMessage('Email not valid');
  }

  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()));
      }

      next();
    });
};

module.exports = {
  postValidation,
  deleteValidation,
  putValidation,
};
