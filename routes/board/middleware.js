const { Board } = require('../../mock');

const getBoard = (customParam = false) => (req, res, next) => {
    const boardId = typeof customParam !== "boolean" ? req.body[customParam] : +req.params.id;
    req.app.locals.boardIndex = Board.findIndex(board => board.id === boardId);

    return next()
}

module.exports = {
    getBoard
}