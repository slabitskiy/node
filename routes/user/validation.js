const { errorHandler } = require('../../helpers');
const { User } = require('../../mock');

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
		.withMessage('Email not valid')
		.custom((value) => {
			const idx = User.findIndex(user => user.email === value);

			return idx !== -1 ? false : value;
		})
		.withMessage('User exist');

	req.getValidationResult()
		.then(result => {
			if(!result.isEmpty()) {
				return res.status(400).send(errorHandler(result.array()));
			} 
			
			next();
		});
};

const deleteValidation = (req, res, next) => {
	const { userIndex } = req.app.locals;
    
	req.checkParams('id')
		.exists()
		.notEmpty()
		.withMessage('Id didn\'t provide')
		.custom((value) => {
			if (userIndex === -1) {
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

const putValidation = (req, res, next) => {
    const { userIndex } = req.app.locals;

    if (userIndex === -1) {
        return res.status(400).send(errorHandler('User not found'));
    }

	if(req.body.name) {
		req.checkBody('name')
			.notEmpty()
			.withMessage('Name is emapty');
	}

	if (req.body.email) {
		req.checkBody('email')
			.isEmail()
			.withMessage('Email not valid');
	}
	
	req.checkParams('id')
		.custom((value) => {
			if (userIndex === -1) {
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