const { errorHandler } = require('../../helpers');

const loginValidation = (req, res, next) => {
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

  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()));
      }

      next();
    });
};

module.exports = {
  loginValidation,
};

