import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Response, Request } from 'express';

import User from '../models/user';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, passwordConfirm } = req.body;

  let user = await User.findOne({ email });

  if (user) return res.status(400).send('That user already exisits!');

  user = new User({ name, email, password, passwordConfirm });
  await user.save();

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);

  return res
    .status(201)
    .header('x-auth-token', token)
    .json({ status: 'success', message: 'Created new user', user });
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  let user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).send('Incorrect email or password.');

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).send('Incorrect email or password.');

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!);

  return res.status(200).json({
    status: 'success',
    message: 'Loged in',
    token,
    user: { _id: user._id, name: user.name, email: user.email },
  });
};

export { createUser, login };
