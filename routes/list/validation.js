const { errorHandler, isArrayNumbers, isNumber } = require('../../helpers');

const postValidation = (req, res, next) => {
  req.checkBody('name')
    .exists()
    .withMessage('Name doesn\'t exist')
    .notEmpty()
    .withMessage('Name empty');

  req.checkBody('tasks')
    .exists()
    .withMessage('Tasks doesn\'t exist')
    .isArray()
    .withMessage('Tasks should be an array')
    .custom(isArrayNumbers)
    .withMessage('Values in lists doesn\'t number or string');

  req.checkBody('boardId')
    .exists()
    .withMessage('boardId doesn\'t exist')
    .custom(isNumber)
    .withMessage('boardId not a number');

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

  if (req.body.tasks) {
    req.checkBody('tasks')
    // does't work when we pass empty string
      .isArray()
      .withMessage('Tasks should be an array')
      .custom(isArrayNumbers)
      .withMessage('Values in lists doesn\'t number or string');
  }

  if (req.body.boardId) {
    req.checkBody('boardId')
      .exists()
      .withMessage('boardId doesn\'t exist')
      .custom(isNumber)
      .withMessage('boardId not a number');
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
  putValidation,
};
