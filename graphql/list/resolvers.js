const { List } = require('../../modules');

module.exports = {
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
