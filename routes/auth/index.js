const router = require('express').Router();
const passport = require('passport');

const { User } = require('../../modules');
// const { loginValidation } = require('./validation');
const { postValidation } = require('../user/validation');

router.post(
  '/login',
  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }
      if (info) { return res.status(401).send(info); }

      return next();
    })(req, res, next);
  }, (req, res) => {
    res.send({ message: 'You are successfully logged in' });
  },
);

router.post('/registration', postValidation, async (req, res) => {
  try {
    const userEntity = await User.create(req.body);

    return res.send(userEntity);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
