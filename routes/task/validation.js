const { errorHandler, isArrayNumbers, isNumber } = require('../../helpers');

const postValidation = (req, res, next) => {
  req.checkBody('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title should be a string');

  req.checkBody('listId')
    .notEmpty()
    .withMessage('listId is required')
    .custom(isNumber)
    .withMessage('listId should be a number');

  req.checkBody('author')
    .notEmpty()
    .withMessage('author is required')
    .custom(isNumber)
    .withMessage('author should be a number');

  if (req.body.description) {
    req.checkBody('description')
      .notEmpty()
      .withMessage('Description cann\'t to be empty')
      .custom((value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value;
        }

        return false;
      });
  }

  if (req.body.category) {
    req.checkBody('category')
      .notEmpty()
      .withMessage('Category cann\'t to be empty')
      .isString()
      .withMessage('Category should be a string');
  }

  if (req.body.order) {
    req.checkBody('order')
      .notEmpty()
      .withMessage('Order cann\'t to be empty')
      .isString()
      .withMessage('Order should be a string');
  }

  if (req.body.assignees) {
    req.checkBody('assignees')
      .notEmpty()
      .withMessage('Order cann\'t to be empty')
      .custom(isArrayNumbers)
      .withMessage('Values in assignees doesn\'t number or string');
  }

  req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).send(errorHandler(result.array()));
      }

      next();
    });
};

const putValidation = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).send(errorHandler('Body is empty'));
  }

  if (req.body.title) {
    req.checkBody('title')
      .notEmpty()
      .withMessage('Title is required')
      .isString()
      .withMessage('Title should be a string');
  }

  if (req.body.listId) {
    req.checkBody('listId')
      .notEmpty()
      .withMessage('listId is required')
      .custom(isNumber)
      .withMessage('listId should be a number');
  }

  if (req.body.author) {
    req.checkBody('author')
      .notEmpty()
      .withMessage('author is required')
      .custom(isNumber)
      .withMessage('author should be a number');
  }

  if (req.body.description) {
    req.checkBody('description')
      .notEmpty()
      .withMessage('Description cann\'t to be empty')
      .custom((value) => {
        if (typeof value === 'string' || typeof value === 'number') {
          return value;
        }

        return false;
      });
  }

  if (req.body.category) {
    req.checkBody('category')
      .notEmpty()
      .withMessage('Category cann\'t to be empty')
      .isString()
      .withMessage('Category should be a string');
  }

  if (req.body.order) {
    req.checkBody('order')
      .notEmpty()
      .withMessage('Order cann\'t to be empty')
      .isString()
      .withMessage('Order should be a string');
  }

  if (req.body.assignees) {
    req.checkBody('assignees')
      .notEmpty()
      .withMessage('Order cann\'t to be empty')
      .custom(isArrayNumbers)
      .withMessage('Values in assignees doesn\'t number or string');
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
