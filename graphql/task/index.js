const { makeExecutableSchema } = require('graphql-tools');
const { Task } = require('../../modules');
const { user } = require('../user/types');
const { task } = require('./types');
const { list } = require('../list/types');

const typeDefs = `
    ${user}
    ${task}
    ${list}
    
    type Query {
        tasks: [Task]
        taskById (id: String!): Task
    }

    input TaskInpt {
      title:  String!
      listId: String!
      description: String
      category: String!
      order: Int
      author: String!
      assignees: String
    }

    input TaskUpdateInpt {
      title:  String
      listId: String
      description: String
      category: String
      order: Int
      author: String
      assignees: String
    }

    type Mutation  {
      createTask (task: TaskInpt!): Task
      updateTask (id: String!, task: TaskUpdateInpt!): Task
      deleteTask (id: String!): Task
    }

`;

const resolvers = {
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


module.exports = makeExecutableSchema({ typeDefs, resolvers });
