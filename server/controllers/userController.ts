import { Response, Request, NextFunction } from 'express';

import { decode } from '../utils/authHelpers';
import { ErrorHandler } from '../utils/ErrorHandler';
import { getUser, loginUser, createUser as createUserDB } from '../db/userQueries';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    const { token, newUser } = await createUserDB(name, email, password, passwordConfirm);
    res.status(201).header('x-auth-token', token).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token, user } = await loginUser(req.body.email, req.body.password);
    res.status(200).json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;
  if (token === '' || token === undefined) {
    throw new ErrorHandler(404, 'You are not logged in! Please log in to get access.');
  }
  try {
    const userId = decode(token);
    const user = await getUser(userId);
    res.status(200).json({ name: user!.name, email: user!.email });
  } catch (err) {
    next(err);
  }
};

export { createUser, login, getMe };
