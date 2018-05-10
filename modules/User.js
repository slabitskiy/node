const mongoose = require('mongoose');
const { crypt } = require('../helpers');

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
  password: {
    type: String,
    required: true,
    select: false,
  },
});

scheme.set('toJSON', { versionKey: false });
scheme.set('toObject', { versionKey: false });

const User = mongoose.model('Users', scheme);

scheme.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();

    this.password = await crypt.hashing(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});

const create = async (user) => {
  try {
    const newUser = new User(user);
    const userEntity = await newUser.save();

    return {
      name: userEntity.name,
      _id: userEntity._id,
      email: userEntity.email,
    };
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

const findByEmail = async (email, withPassword = false) => {
  try {
    return withPassword ? await User.findOne({ email }).select('password email') : await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  list,
  getById,
  deleteById,
  updateById,
  findByEmail,
};
