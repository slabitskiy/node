const router = require('express').Router();

const { Task } = require('../../modules');
const { postValidation, putValidation } = require('./validation');

router.get('/', async (req, res) => {
  try {
    const tasksList = await Task.list();

    res.send(tasksList);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post('/', postValidation, async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.send(task);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const taskEntity = await Task.getById(req.params.id);

    res.send(taskEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const taskEntity = await Task.deleteById(req.params.id);

    res.send(taskEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.put('/:id', putValidation, async (req, res) => {
  try {
    const taskUpdated = await Task.updateById(req.params.id, req.body);

    res.send(taskUpdated);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
