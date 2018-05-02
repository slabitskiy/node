const mongoose = require('mongoose');

const scheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

scheme.set('toJSON', { versionKey: false });
scheme.set('toObject', { versionKey: false });

const User = mongoose.model('Users', scheme);

const create = async (user) => {
  try {
    const newUser = new User(user);
    const userEntity = await newUser.save();

    return userEntity;
  } catch (err) {
    throw new Error(err.message);
  }
};

const list = async () => {
  try {
    const usersList = await User.find().exec();

    return usersList;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getById = async (id) => {
  try {
    const userEntity = await User.findById(id);

    if (!userEntity) {
      throw new Error('User doesn\'t exist');
    }

    return userEntity;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteById = async (_id) => {
  try {
    const removedUsed = await User.findOneAndRemove({ _id }).exec();

    return removedUsed;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateById = async (id, user) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { $set: user }, { new: true });

    return updatedUser;
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
