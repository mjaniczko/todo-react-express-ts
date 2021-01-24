import jwt from 'jsonwebtoken';

import { ErrorHandler } from './ErrorHandler';

export const decode = (token: string) => {
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET!) as { _id: string };
    return _id;
  } catch {
    throw new ErrorHandler(400, 'Failed to verify token.');
  }
};
