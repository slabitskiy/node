const { Board } = require('../../modules');

module.exports = {
  Query: {
    boards: async () => {
      const boards = await Board.list();

      return boards;
    },
    boardById: async (_, { id }) => {
      const board = await Board.getById(id);

      return board;
    },
  },
  Mutation: {
    createBoard: async (_, { board }) => {
      const newBoard = await Board.create(board);

      return newBoard;
    },
    updateBoard: async (_, { id, board }) => {
      const updatedBoard = await Board.updateById(id, board);

      return updatedBoard;
    },
    deleteBoard: async (_, { id }) => {
      const deletedBoard = await Board.deleteById(id);

      return deletedBoard;
    },
  },
};
