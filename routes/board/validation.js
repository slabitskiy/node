const { errorHandler, isArrayNumbers} = require('../../helpers');
const { Board } = require('../../mock');

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
        .then(result => {
            if(!result.isEmpty()) {
                return res.status(400).send(errorHandler(result.array()));
            } 
            
            return next();		
        });
}

const deleteValidation = (req, res, next) => {
	const { boardIndex } = req.app.locals;	    

    req.checkParams('id')
        .custom((value) => {
            if (boardIndex === -1) {
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
            req.app.locals.boardIndex = boardIndex;
            return next();
    });
}

const putValidation = (req, res, next) => {
	const { boardIndex } = req.app.locals;	
    
	if(req.body.name) {
		req.checkBody('name')
			.notEmpty()
			.withMessage('Name is emapty');
	}

	if (req.body.lists) {
		req.checkBody('lists')
			.notEmpty()
			.withMessage('Lists is empty')
            .custom(isArrayNumbers)
            .withMessage('Values in lists doesn\'t number or string');
	}
	
	req.checkParams('id')
		.custom((value) => {
			if (boardIndex === -1) {
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
            
            req.app.locals.boardIndex = boardIndex;
            
			return next();
		});
}

module.exports = {
    postValidation,
    deleteValidation,
    putValidation
};
