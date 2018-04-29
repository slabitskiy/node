const { errorHandler, isArrayNumbers, isNumber } = require('../../helpers');

const postValidation = (req, res, next) => {
	const { boardIndex } = req.app.locals;	    
    
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
        .withMessage('boardId not a number')
        .custom((value) => boardIndex >= 0 ? `${value}` : false)
        .withMessage('Board doesn\'t exist');

    req.getValidationResult()
        .then(result => {
            if(!result.isEmpty()) {
                return res.status(400).send(errorHandler(result.array()));
            } 
            
            next();			
        });
};

const deleteValidation =  (req, res, next) => {
    const { listIndex } = req.app.locals;
    
    req.checkParams('id')
        .custom((value) => {
            if (listIndex === -1) {
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
    const { listIndex } = req.app.locals;
    
    if(req.body.name) {
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
            .withMessage('boardId not a number')
            .custom((value) => listIndex >= 0 ? `${value}` : false)
            .withMessage('Board doesn\'t exist');
	}
	
	req.checkParams('id')
		.custom((value) => {
			if (listIndex === -1) {
				return false;
			}
			return value;
		})
		.withMessage('User not found');

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