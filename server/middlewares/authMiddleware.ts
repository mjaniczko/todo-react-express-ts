import { Response, NextFunction } from 'express';

import { User } from '../models/user';
import { decode } from '../utils/authHelpers';
import { ApiError } from '../utils/ApiError';
import { RequestWithUser } from '../types/shared';

export const protect = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return next(ApiError.notAuthorized('You are not logged in! Please log in to get access.'));
  }

  const decoded = decode(token);

  try {
    const currentUser = await User.findById(decoded).select('-__v');

    if (!currentUser) {
      return next(ApiError.notFound('The user belonging to this token does not longer exist.'));
    }

    req.user = currentUser._id;
    next();
  } catch (_) {
    next(ApiError.internal('Ups... Something went wrong during authentication'));
  }
};
