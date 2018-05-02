const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],
});

scheme.set('toJSON', { versionKey: false });
scheme.set('toObject', { versionKey: false });

const Board = mongoose.model('Boards', scheme);

const create = async (board) => {
  try {
    const newBoard = new Board(board);
    const createdBoard = await newBoard.save();

    return createdBoard;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getById = async (id) => {
  try {
    const boardEntity = await Board.findById(id).populate('lists').exec();

    if (!boardEntity) {
      throw new Error('Board doesn\'t exist');
    }

    return boardEntity;
  } catch (err) {
    throw new Error(err.message);
  }
};

const list = async () => {
  try {
    const boardList = await Board.find().populate('lists').exec();

    return boardList;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteById = async (id) => {
  try {
    const boardRemoved = await Board.findByIdAndRemove(id);

    return boardRemoved;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateById = async (id, board) => {
  try {
    const boardUpdated = await Board.findByIdAndUpdate(id, { $set: board }, { new: true });

    return boardUpdated;
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
