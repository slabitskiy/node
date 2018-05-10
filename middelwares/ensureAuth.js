module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).send({ message: 'You are not logged in.' });
  }
  return next();
};

