
const { mergeSchemas } = require('graphql-tools');

const user = require('./user');
const task = require('./task');
const list = require('./list');
const board = require('./board');

const schemas = [user, task, list, board];


module.exports = mergeSchemas({ schemas });

