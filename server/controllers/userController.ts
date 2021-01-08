import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';

import { User } from '../models/user';
import { RequestWithUser } from '../types/shared';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, passwordConfirm } = req.body;

  const user = await User.findOne({ email });

  if (user) return res.status(400).send('That user already exisits!');

  const newUser = new User({ name, email, password, passwordConfirm });
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET!);

  return res
    .status(201)
    .header('x-auth-token', token)
    .json({ message: 'Created new user', user: newUser });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).send('Incorrect email or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Incorrect email or password.');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);

  return res.status(200).json({
    message: 'Loged in',
    token,
    user: { name: user.name, email: user.email },
  });
};

const getMe = async (req: RequestWithUser, res: Response): Promise<void> => {
  const token = req.query.token as string;

  if (token === '' || token === undefined) {
    res.status(401).json({ message: 'You are not logged in! Please log in to get access.' });
  } else {
    // Add try catch here
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const currentUser = await User.findById(decoded);

    if (!currentUser) {
      res.status(401).json({ message: 'The user belonging to this token does not longer exist.' });
    } else {
      const user = await User.findOne({ _id: currentUser._id });
      res.status(200).json({ name: user!.name, email: user!.email });
    }
  }
};

export { createUser, login, getMe };
