import jwt from 'jsonwebtoken';
import { Response } from 'express';

import { User } from '../models/user';

export const protect = async (req: any, _res: Response, next: any): Promise<void> => {
  try {
    const token = req.query.token;

    if (!token) {
      return next(new Error('You are not logged in! Please log in to get access.'));
    }

    const decoded: any = await jwt.verify(token, process.env.JWT_SECRET!);
    const currentUser: any = await User.findById(decoded);

    if (!currentUser) {
      return next(new Error('The user belonging to this token does not longer exist.'));
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.log('Ups... Something went wrong during authentication');
    console.log(error);
  }
};
