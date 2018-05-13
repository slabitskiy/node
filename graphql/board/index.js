const { makeExecutableSchema } = require('graphql-tools');
const { Board } = require('../../modules');
const { board } = require('./types');
const { list } = require('../list/types');
const { task } = require('../task/types');
const { user } = require('../user/types');

const typeDefs = `
    ${user}
    ${task}
    ${list}
    ${board}
    type Query {
        boards: [Board]
        boardById (id: String!): Board
    }

    input BoardInp {
        name: String!
        lists: [String]
    }

    input BoardUpdateInp {
        name: String
        lists: [String]
    }

    type Mutation  {
      createBoard (board: BoardInp!): Board
      updateBoard (id: String!, board: BoardUpdateInp!): Board
      deleteBoard (id: String!): Board
    }

`;

const resolvers = {
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


module.exports = makeExecutableSchema({ typeDefs, resolvers });
