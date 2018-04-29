const router = require('express').Router();

const { User } = require('../../mock');
const { postValidation, deleteValidation, putValidation } = require('./validation');
const { getUser } = require('./middleware');

router.post('/', postValidation, (req, res) => {
	const userId = User.push({ ...req.body, id: User.length + 1});
	const userEntity = User.find(user => user.id === userId);

	res.send(userEntity);	
});

router.get('/', (req, res) => {
	res.send(User);
});

router.get('/:id', getUser(), (req, res) => {
	const { userIndex } = req.app.locals;
	const userEntity = User[userIndex];

	if (!userEntity) {
		return res.status(409).send({ message: 'User doesn\'t exist' });	
	}

	res.send(userEntity);
});

router.delete('/:id', [ getUser(), deleteValidation ], (req, res) => {
	const { userIndex } = req.app.locals;
	const userEntity = User.splice(userIndex, 1);

	res.send({ message: `${userEntity[0].email} deleted` });	
});

router.put('/:id', [ getUser(), putValidation ], (req, res) => {
	const { userIndex } = req.app.locals;
	
	const newUser = { ...User[userIndex], ...req.body };
	const userEntity = User.splice(userIndex, 1, newUser);

	res.send({ message: `${userEntity[0].email} updated` });
});

module.exports = router;