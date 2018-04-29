const { List } = require('../../mock');

const getList = (customParam = false) => (req, res, next) => {
    const listId = typeof customParam !== "boolean" ? req.body[customParam] : +req.params.id;
    req.app.locals.listIndex = List.findIndex(list => list.id === listId);

    return next();
}

module.exports = {
    getList
}