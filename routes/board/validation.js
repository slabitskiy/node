const { errorHandler, isArrayNumbers } = require('../../helpers');

const postValidation = (req, res, next) => {
  req.checkBody('name')
    .exists()
    .withMessage('Name doesn\'t exist')
    .notEmpty()
    .withMessage('Name empty');

  req.checkBody('lists')
    .exists()
    .withMessage('Lists doesn\'t exist')
    .isArray()
    .withMessage('Lists should be an array')
    .custom(isArrayNumbers)
    .withMessage('Values in lists doesn\'t number or string');

  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()));
      }

      return next();
    });
};

const putValidation = (req, res, next) => {
  if (req.body.name) {
    req.checkBody('name')
      .notEmpty()
      .withMessage('Name is empty');
  }

  if (req.body.lists) {
    req.checkBody('lists')
      .notEmpty()
      .withMessage('Lists is empty')
      .custom(isArrayNumbers)
      .withMessage('Values in lists doesn\'t number or string');
  }

  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()));
      }

      return next();
    });
};

module.exports = {
  postValidation,
  putValidation,
};
