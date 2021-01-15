import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { ApiError } from '../utils/ApiError';

export const getUser = async (decoded: any) => {
  try {
    const currentUser = await User.findById(decoded).select('-__v');

    if (!currentUser) {
      return ApiError.notFound('The user belonging to this token does not longer exist.');
    }
    const user = await User.findOne({ _id: currentUser._id });
    return user;
  } catch (err) {
    console.log(err);
    return ApiError.internal('Failed to get user');
  }
};

export const loginUser = async (body: any) => {
  try {
    const { email, password } = body;
    if (!email || !password) {
      return ApiError.badRequest('Please provide email and password!');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return ApiError.notAuthorized('Incorret email or password');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return ApiError.notAuthorized('Incorret email or password');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);

    return { user, token };
  } catch (err) {
    console.log(err);
    return ApiError.internal('Failed to login user');
  }
};
