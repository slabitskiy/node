const router = require('express').Router();

const { errorHandler, isArrayNumbers} = require('../helpers');
const { Board } = require('../mock');

router.get('/', (req, res) => {
    res.send(Board);
});

router.post('/', (req, res) => {
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
            
            const boardId = Board.push({ ...req.body, id: Board.length + 1});
            const boardEntity = Board.find(board => board.id === boardId);

            res.send(boardEntity);				
		});

});

router.get('/:id', (req, res) => {
    const boardEntity = Board.find(board => board.id === +req.params.id);

    if (!boardEntity) {
        return res.status(409).send({ message: 'Board doesn\'t exist' });
    }

    res.send(boardEntity);
});


router.delete('/:id', (req, res) => {
    const boardIndex = Board.findIndex(board => board.id === +req.params.id);

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
            } else {
                const boardEntity = Board.splice(boardIndex, 1);

                res.send({ message: `${boardEntity[0].name} deleted` });				
            }
        });
});

router.put('/:id', (req, res) => {
	const boardIndex = Board.findIndex(board => board.id === +req.params.id);
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
		.withMessage('User not found');

	req.getValidationResult()
		.then(result => {
			if(!result.isEmpty()) {
				return res.status(400).send(errorHandler(result.array()));
			} else {
				const newBoard = { ...Board[boardIndex], ...req.body };
                const boardEntity = Board.splice(boardIndex, 1, newBoard);

				res.send({ message: `${boardEntity[0].name} updated` });				
			}
		});
});


module.exports = router;