const router = require('express').Router();

const { List, Board } = require('../../mock');
const { postValidation, deleteValidation , putValidation} = require('./validation');
const { getBoard } = require('../board/middleware');
const { getList } = require('./middleware');

router.get('/', (req, res) => {
    res.send(List);
});

router.post('/', [ getBoard('boardId'), postValidation ], (req, res) => {    
    const listId = List.push({ ...req.body, id: List.length + 1});
    const listEntity = List.find(list => list.id === listId);

    res.send(listEntity);	
});

router.get('/:id', [ getList() ], (req, res) => {
    const { listIndex } = req.app.locals;
    const listEntity = List[listIndex];

    if (!listEntity) {
        return res.status(409).send({ message: 'Board doesn\'t exist' });
    }

    res.send(listEntity);
});


router.delete('/:id', [ getList(), deleteValidation ], (req, res) => {
    const { listIndex } = req.app.locals;
    const listEntity = List.splice(listIndex, 1);

    res.send({ message: `${listEntity[0].name} deleted` });	
});

router.put('/:id', [ getList(), putValidation ], (req, res) => {
    const listIndex = List.findIndex(list => list.id === +req.params.id);
    
    const newList = { ...List[listIndex], ...req.body };
    const listEntity = List.splice(listIndex, 1, newList);

    res.send({ message: `${listEntity[0].name} updated` });	
});


module.exports = router;