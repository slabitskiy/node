const { User } = require('../../mock');

const getUser = (customParam = false) => (req, res, next) => {
    const userId = typeof customParam !== "boolean" ? req.body[customParam] : +req.params.id;
    req.app.locals.userIndex = User.findIndex(user => user.id === userId);

    return next();
}

module.exports = {
    getUser
}