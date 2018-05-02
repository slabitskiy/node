const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lists',
    required: true,
  },
  description: {
    type: String,
    maxlength: 80,
    default: '',
  },
  category: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  assignees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
});


const Task = mongoose.model('Tasks', scheme);

const create = async (task) => {
  try {
    const newTask = new Task(task);
    const taskSaved = await newTask.save();

    return taskSaved;
  } catch (err) {
    throw new Error(err.message);
  }
};

const list = async () => {
  try {
    const tasksList = await Task.find()
      .populate('author')
      .populate('listId')
      .populate('assignees')
      .exec();

    return tasksList;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getById = async (id) => {
  try {
    const taskEntity = await Task.findById(id).populate('lists').exec();

    if (!taskEntity) {
      throw new Error('Task doesn\'t exist');
    }

    return taskEntity;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteById = async (id) => {
  try {
    const boardRemoved = await Task.findByIdAndRemove(id);

    return boardRemoved;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateById = async (id, board) => {
  try {
    const boardUpdated = await Task.findByIdAndUpdate(id, { $set: board }, { new: true });

    return boardUpdated;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  create,
  list,
  getById,
  deleteById,
  updateById,
};
