import { Router } from 'express';

import { createUser, login, getMe } from '../controllers/userController';

export const userRouter: Router = Router();

userRouter.get('/me', getMe);
userRouter.post('/login', login);
userRouter.post('/signup', createUser);
