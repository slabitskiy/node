const router = require('express').Router();

const { List, Task, User } = require('../../mock');
const { postValidation, deleteValidation, putValidation } = require('./validation');
const { getTask } = require('./middleware');

router.get('/', (req, res) => {
    res.send(Task);
});

router.post('/', postValidation, (req, res) => {
    const taskId = Task.push({ ...req.body, id: Task.length + 1});
    const taskEntity = Task.find(task => task.id === taskId);

    res.send(taskEntity);	
});

router.get('/:id', getTask(), (req, res) => {
    const { taskIndex } = req.app.locals;
    const taskEntity = Task[taskIndex];

    if (!taskEntity) {
        return res.status(409).send({ message: 'Task doesn\'t exist' });
    }

    res.send(taskEntity);
});

router.delete('/:id', [ getTask(), deleteValidation ], (req, res) => {
    const { taskIndex } = req.app.locals;
    
    const taskEntity = Task.splice(taskIndex, 1);

    res.send({ message: `${taskEntity[0].title} deleted` });	
});

router.put('/:id', [ getTask(), putValidation ], (req, res) => {
    const { taskIndex } = req.app.locals;
    const updatedTask = { ...Task[taskIndex], ...req.body };
    const taskEntity = Task.splice(taskIndex, 1, updatedTask);

    res.send({ message: `${taskEntity[0].title} updated` });
});

module.exports = router;