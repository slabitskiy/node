const { errorHandler, isArrayNumbers, isNumber } = require('../../helpers');
const { User } = require('../../mock');

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
            .withMessage('Values in assignees doesn\'t number or string')
            .custom((value) => {
                if (Array.isArray(value)) {
                    return value.every(el => User.findIndex(user => user.id === el) >= 0)
                }
                return false;
            })
            .withMessage('User doesn\'t exist');

    }

    req.getValidationResult()
        .then(result => {
            if(!result.isEmpty()) {
                return res.status(400).send(errorHandler(result.array()));
            } 

            next();
        });
};

const deleteValidation = (req, res, next) => {
    const { taskIndex } = req.app.locals;
    
    req.checkParams('id')
        .custom((value) => {
            if (taskIndex === -1) {
                return false;
            }
            return value;
        })
        .withMessage('Board not found');

    req.getValidationResult()
        .then(result => {
            if(!result.isEmpty()) {
                return res.status(400).send(errorHandler(result.array()));
            }

            next();
        });
};

const putValidation = (req, res, next) => {
    const { taskIndex } = req.app.locals;
    
    if (!Object.keys(req.body).length) {
        return res.status(400).send(errorHandler('Body is empty'));
    }

    if (taskIndex === -1) {
        return res.status(400).send(errorHandler('Task not found'));
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
            .withMessage('Values in assignees doesn\'t number or string')
            .custom((value) => {
                if (Array.isArray(value)) {
                    return value.every(el => User.findIndex(user => user.id === el) >= 0)
                }
                return false;
            })
            .withMessage('User doesn\'t exist');
    }

    req.getValidationResult()
        .then(result => {
            if(!result.isEmpty()) {
                return res.status(400).send(errorHandler(result.array()));
            }

            next();
        });
};

module.exports = {
    postValidation,
    deleteValidation,
    putValidation
};