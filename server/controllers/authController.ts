import jwt from 'jsonwebtoken';
import { Response } from 'express';

import { User } from '../models/user';
import { RequestWithUser } from '../types/shared';

export const protect = async (req: RequestWithUser, _res: Response, next: any): Promise<void> => {
  try {
    const token = req.query.token as string;

    if (!token) {
      return next(new Error('You are not logged in! Please log in to get access.'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const currentUser = await User.findById(decoded).select('-__v');

    if (!currentUser) {
      return next(new Error('The user belonging to this token does not longer exist.'));
    }

    req.user = currentUser._id;
    next();
  } catch (error) {
    console.log('Ups... Something went wrong during authentication');
    console.log(error);
  }
};
