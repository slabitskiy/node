const router = require('express').Router();

const { List } = require('../../modules');
const { postValidation, putValidation } = require('./validation');

router.get('/', async (req, res) => {
  try {
    const listEntity = await List.list();

    res.send(listEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post('/', postValidation, async (req, res) => {
  try {
    const listEntity = await List.create(req.body);

    res.send(listEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const listEntity = await List.getById(req.params.id);

    res.send(listEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const listEntity = await List.deleteById(req.params.id);

    res.send(listEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.put('/:id', putValidation, async (req, res) => {
  try {
    const listEntity = await List.updateById(req.params.id, req.body);

    res.send(listEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


module.exports = router;
