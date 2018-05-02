const router = require('express').Router();

const { User } = require('../../modules');
const {
  postValidation,
  deleteValidation,
  putValidation,
} = require('./validation');


router.post('/', postValidation, async (req, res) => {
  try {
    const userEntity = await User.create(req.body);
    return res.send(userEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const usersList = await User.list();
    res.send(usersList);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const userEntity = await User.getById(req.params.id);
    res.send(userEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete('/:id', deleteValidation, async (req, res) => {
  try {
    const userEntity = await User.deleteById(req.params.id);

    res.send({ message: `${userEntity[0].email} deleted` });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.put('/:id', putValidation, async (req, res) => {
  try {
    const userEntity = await User.updateById(req.params.id, req.body);

    res.send(userEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
