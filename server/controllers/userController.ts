import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

import { User } from '../models/user';
import { ApiError } from '../utils/ApiError';
// import { RequestWithUser } from '../types/shared';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(ApiError.badRequest('User with given email already exist'));
  }

  const newUser = new User({ name, email, password, passwordConfirm });
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET!);

  res.status(201).header('x-auth-token', token).json({ user: newUser });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(ApiError.badRequest('Please provide email and password!'));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(ApiError.notAuthorized('Incorret email or password'));
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(ApiError.notAuthorized('Incorret email or password'));
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);

  res.status(200).json({
    token,
    user: { name: user.name, email: user.email },
  });
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  if (token === '' || token === undefined) {
    return next(ApiError.notAuthorized('You are not logged in! Please log in to get access.'));
  } else {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const currentUser = await User.findById(decoded);

    if (!currentUser) {
      return next(
        ApiError.notAuthorized('The user belonging to this token does not longer exist.')
      );
    } else {
      const user = await User.findOne({ _id: currentUser._id });
      res.status(200).json({ name: user!.name, email: user!.email });
    }
  }
};

export { createUser, login, getMe };
