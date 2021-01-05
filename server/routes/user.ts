import { Router } from 'express';

import { createUser, login } from '../controllers/userController';

export const userRouter: Router = Router();

userRouter.post('/login', login);
userRouter.post('/signup', createUser);
