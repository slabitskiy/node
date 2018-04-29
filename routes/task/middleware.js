const { Task } = require('../../mock');

const getTask = (customParam = false) => (req, res, next) => {
    const taskId = typeof customParam !== "boolean" ? req.body[customParam] : +req.params.id;
    req.app.locals.taskIndex = Task.findIndex(task => task.id === taskId);

    return next();
}

module.exports = {
    getTask
}