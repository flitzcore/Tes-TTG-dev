const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const validator = require('validator');
const createUser = async (userBody) => {
  if (!validator.isEmail(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid email');
  }
  if (userBody.password.length < 8) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password must be at least 8 characters long');
  }
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};


const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};


const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.deleteOne();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
};
