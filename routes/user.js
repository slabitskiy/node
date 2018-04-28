const router = require('express').Router();

const { User } = require('../mock');

router.post('/', (req, res) => {
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

			if (idx !== -1) {
				return false;
			}
			
			return value;
		})
		.withMessage('User exist');

	req.getValidationResult()
		.then(result => {
			if(!result.isEmpty()) {
				const message = result.array().map(error => error.msg );
				res.status(400).send({ message });
			} else {
				const userId = User.push({ ...req.body, id: User.length + 1});
				const userEntity = User.find(user => user.id === userId);

				res.send(userEntity);				
			}
		})
});

router.get('/', (req, res) => {
	res.send(User);
});

router.get('/:id', (req, res) => {
	req.checkParams('id', 'Id didn\'t provide')
		.exists()
		.notEmpty();
	
	req.getValidationResult()
		.then(result => {
			if(!result.isEmpty()) {
				const message = result.array().map(error => error.msg );
				res.status(400).send({ message });
			} else {
				const userEntity = User.find(user => user.id === +req.params.id);

				if (!userEntity) {
					res.status(409).send({ message: 'User doesn\'t exist' });
					return;
				}

				res.send(userEntity);				
			}
		});

});

router.delete('/:id', (req, res) => {
	const userIndex = User.findIndex(user => user.id === +req.params.id);

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
				const message = result.array().map(error => error.msg );
				res.status(400).send({ message });
			} else {
				const userEntity = User.splice(userIndex, 1);

				res.send({ message: `${userEntity[0].email} deleted` });				
			}
		});
});

router.put('/:id', (req, res) => {
	const userIndex = User.findIndex(user => user.id === +req.params.id);

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
				const message = result.array().map(error => error.msg );
				res.status(400).send({ message });
			} else {
				const newUser = { ...User[userIndex], ...req.body };
				const userEntity = User.splice(userIndex, 1, newUser);


				console.log(User)

				res.send({ message: `${userEntity[0].email} updated` });				
			}
		});
});

module.exports = router;