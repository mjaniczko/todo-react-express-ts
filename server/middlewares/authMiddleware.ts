import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';

import { User } from '../models/user';
import { ApiError } from '../utils/ApiError';
import { RequestWithUser } from '../types/shared';

export const protect = async (req: RequestWithUser, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(ApiError.notAuthorized('You are not logged in! Please log in to get access.'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const currentUser = await User.findById(decoded).select('-__v');

    if (!currentUser) {
      return next(ApiError.notFound('The user belonging to this token does not longer exist.'));
    }

    req.user = currentUser._id;
    next();
  } catch (_) {
    next(ApiError.notAuthorized('Ups... Something went wrong during authentication'));
  }
};
