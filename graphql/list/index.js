const { makeExecutableSchema } = require('graphql-tools');
const { List } = require('../../modules');
const { list } = require('./types');
const { task } = require('../task/types');
const { user } = require('../user/types');

const typeDefs = `
    ${user}
    ${task}
    ${list}
    type Query {
        lists: [List]
        listById (id: String!): List
    }

    input ListInpt {
        name: String!
        boardId: String!
        tasks: [String]
    }

    input ListUpdateInpt {
        name: String
        boardId: String
        tasks: [String]
    }

    type Mutation  {
      createList (list: ListInpt!): List
      updateList (id: String!, list: ListUpdateInpt!): List
      deleteList (id: String!): List
    }

`;

const resolvers = {
  Query: {
    lists: async () => {
      const lists = await List.list();

      return lists;
    },
    listById: async (_, { id }) => {
      const list = await List.getById(id);

      return list;
    },
  },
  Mutation: {
    createList: async (_, { list }) => {
      const newList = await List.create(list);

      return newList;
    },
    updateList: async (_, { id, list }) => {
      const updatedList = await List.updateById(id, list);

      return updatedList;
    },
    deleteList: async (_, { id }) => {
      const deletedList = await List.deleteById(id);

      return deletedList;
    },
  },
};


module.exports = makeExecutableSchema({ typeDefs, resolvers });
