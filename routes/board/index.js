const router = require('express').Router();

const { errorHandler, isArrayNumbers} = require('../../helpers');
const { Board } = require('../../mock');

const { postValidation, deleteValidation, putValidation } = require('./validation');
const { getBoard } = require('./middleware');

router.get('/', (req, res) => {
    res.send(Board);
});

router.post('/', postValidation, (req, res) => {
	const boardId = Board.push({ ...req.body, id: Board.length + 1});
	const boardEntity = Board.find(board => board.id === boardId);

	res.send(boardEntity);
});

router.get('/:id', (req, res) => {
    const boardEntity = Board.find(board => board.id === +req.params.id);

    if (!boardEntity) {
        return res.status(409).send({ message: 'Board doesn\'t exist' });
    }

    res.send(boardEntity);
});


router.delete('/:id', [ getBoard(), deleteValidation ], (req, res) => {
	const { boardIndex } = req.app.locals;	
	const boardEntity = Board.splice(boardIndex, 1);

	res.send({ message: `${boardEntity[0].name} deleted` });
});

router.put('/:id', [ getBoard(), putValidation ], (req, res) => {
	const { boardIndex } = req.app.locals;
	const newBoard = { ...Board[boardIndex], ...req.body };
	const boardEntity = Board.splice(boardIndex, 1, newBoard);

	res.send({ message: `${boardEntity[0].name} updated` });
});


module.exports = router;