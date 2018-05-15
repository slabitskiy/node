const { Task } = require('../../modules');

module.exports = {
  Query: {
    tasks: async () => {
      const tasks = await Task.list();

      return tasks;
    },
    taskById: async (_, { id }) => {
      const task = await Task.getById(id);

      return task;
    },
  },
  Mutation: {
    createTask: async (_, { task }) => {
      const newTask = await Task.create(task);

      return newTask;
    },
    updateTask: async (_, { id, task }) => {
      const updatedTask = await Task.updateById(id, task);

      return updatedTask;
    },
    deleteTask: async (_, { id }) => {
      const deletedTask = await Task.deleteById(id);

      return deletedTask;
    },
  },
};
