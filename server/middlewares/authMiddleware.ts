import { Response, NextFunction } from 'express';

import { User } from '../models/user';
import { decode } from '../utils/authHelpers';
import { ErrorHandler } from '../utils/ErrorHandler';
import { RequestWithUser } from '../types/shared';

export const protect = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(new ErrorHandler(401, 'You are not logged in! Please log in to get access.'));
  }

  const decoded = decode(token);

  try {
    const currentUser = await User.findById(decoded).select('-__v');

    if (!currentUser) {
      return next(new ErrorHandler(404, 'The user belonging to this token does not longer exist.'));
    }

    req.user = currentUser._id;
    next();
  } catch (err) {
    if (err instanceof ErrorHandler) {
      return next(new ErrorHandler(err.statusCode, err.message));
    }
    return next(new ErrorHandler(500, 'Ups... Something went wrong during authentication'));
  }
};
