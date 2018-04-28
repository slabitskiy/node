const router = require('express').Router();

const { errorHandler, isArrayNumbers, isNumber } = require('../helpers');
const { List, Board } = require('../mock');

router.get('/', (req, res) => {
    res.send(List);
});

router.post('/', (req, res) => {
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
        .custom((value) => Board.findIndex(el => el.id === value) >= 0 ? `${value}` : false)
        .withMessage('Board doesn\'t exist');

	req.getValidationResult()
		.then(result => {
			if(!result.isEmpty()) {
                return res.status(400).send(errorHandler(result.array()));
            } 
            
            const listId = List.push({ ...req.body, id: List.length + 1});
            const listEntity = List.find(list => list.id === listId);

            res.send(listEntity);				
		})

});

router.get('/:id', (req, res) => {
    const boardEntity = Board.find(board => board.id === +req.params.id);

    if (!boardEntity) {
        return res.status(409).send({ message: 'Board doesn\'t exist' });
    }

    res.send(boardEntity);
});


router.delete('/:id', (req, res) => {
    const listIndex = List.findIndex(list => list.id === +req.params.id);

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
            } else {
                const listEntity = List.splice(listIndex, 1);

                res.send({ message: `${listEntity[0].name} deleted` });				
            }
        });
});

router.put('/:id', (req, res) => {
    const listIndex = List.findIndex(list => list.id === +req.params.id);
    
	if(req.body.name) {
		req.checkBody('name')
			.notEmpty()
			.withMessage('Name is emapty');
    }

	if (req.body.tasks) {
		req.checkBody('tasks')
			.notEmpty()
            .withMessage('Tasks is empty')
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
            .custom((value) => Board.findIndex(el => el.id === value) >= 0 ? `${value}` : false)
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
			} else {
				const newList = { ...List[listIndex], ...req.body };
                const listEntity = List.splice(listIndex, 1, newList);

				res.send({ message: `${listEntity[0].name} updated` });				
			}
		});
});


module.exports = router;