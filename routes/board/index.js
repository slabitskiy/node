const router = require('express').Router();

const { Board } = require('../../modules');

const { postValidation, putValidation } = require('./validation');

router.get('/', async (req, res) => {
  try {
    const boardEntity = await Board.list();
    res.send(boardEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post('/', postValidation, async (req, res) => {
  try {
    const boardEntity = await Board.create(req.body);

    res.send(boardEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const boardEntity = await Board.getById(req.params.id);
    res.send(boardEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const board = await Board.deleteById(req.params.id);

    res.send(board);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.put('/:id', putValidation, async (req, res) => {
  try {
    const board = await Board.updateById(req.params.id, req.body);

    res.send(board);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


module.exports = router;
