const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
  name: {
    type: String,
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boards',
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks',
      },
    ],
  },
});

const List = mongoose.model('Lists', scheme);

const create = async (list) => {
  try {
    const newList = new List(list);
    const createdBoard = await newList.save();

    return createdBoard;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getById = async (id) => {
  try {
    const taskEntity = await List.findById(id)
      .populate('boardId')
      .populate('tasks')
      .exec();

    if (!taskEntity) {
      throw new Error('Entity doesn\'t exist');
    }

    return taskEntity;
  } catch (err) {
    throw new Error(err.message);
  }
};

const list = async () => {
  try {
    const listEntity = await List.find()
      .populate('boardId')
      .populate('tasks')
      .exec();

    return listEntity;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteById = async (id) => {
  try {
    const listRemoved = await List.findByIdAndRemove(id);

    return listRemoved;
  } catch (err) {
	 throw new Error(err.message);
  }
};

const updateById = async (id, _list) => {
  try {
    const listUpdated = await List.findByIdAndUpdate(id, { $set: _list }, { new: true });

    return listUpdated;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  create,
  getById,
  list,
  deleteById,
  updateById,
};
