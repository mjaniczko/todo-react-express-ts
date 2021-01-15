// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import { User } from '../models/user';
import { decode } from '../utils/authHelpers';
import { ApiError } from '../utils/ApiError';
import { getUser, loginUser } from '../db/userQueries';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return next(ApiError.badRequest('User with given email already exist'));
    }

    const newUser = new User({ name, email, password, passwordConfirm });
    await newUser.save();

    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET!);

    res.status(201).header('x-auth-token', token).json({ user: newUser });
  } catch (_) {
    next(
      ApiError.badRequest(
        'Failed to create user. Name, email, password and password confirmations are required.'
      )
    );
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, user }: any = await loginUser(req.body);

    res.status(200).json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (_) {
    next(ApiError.notAuthorized('Ups... Something went wrong during authentication'));
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  if (token === '' || token === undefined) {
    return next(ApiError.notAuthorized('You are not logged in! Please log in to get access.'));
  }

  const decoded = decode(token);

  try {
    const user: any = await getUser(decoded);
    res.status(200).json({ name: user!.name, email: user!.email });
  } catch (_) {
    next(ApiError.notAuthorized('Ups... Something went wrong during authentication'));
  }
};

export { createUser, login, getMe };
