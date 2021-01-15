import jwt from 'jsonwebtoken';

import { ApiError } from './ApiError';

export const decode = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    console.log(error);
    return ApiError.badRequest('Invalid token');
  }
};
