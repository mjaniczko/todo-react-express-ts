import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { ErrorHandler, handleError } from '../utils/ErrorHandler';

export const createUser = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw new ErrorHandler(404, 'User with given email already exist');
    }

    const newUser = new User({ name, email, password, passwordConfirm });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET!);
    return { token, newUser };
  } catch (err) {
    return handleError(err);
  }
};

export const getUser = async (userId: string) => {
  try {
    const currentUser = await User.findById(userId).select('-__v');

    if (!currentUser) {
      throw new ErrorHandler(404, 'The user belonging to this token does not longer exist.');
    }
    const user = await User.findOne({ _id: currentUser._id });
    return user;
  } catch (err) {
    return handleError(err);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw new ErrorHandler(404, 'Please provide email and password!');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ErrorHandler(404, 'Incorrect email or password');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new ErrorHandler(404, 'Incorrect email or password');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);

    return { user, token };
  } catch (err) {
    return handleError(err);
  }
};
