import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';

import { todoRouter } from './routes/todo';
import { userRouter } from './routes/user';
import { ApiError } from './utils/ApiError';

export const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/user', userRouter);

app.use((error: ApiError, _req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(error.code || 500).json({
    error: { message: error.message || 'Ups something went wrong. Please try again later.' },
  });
  next();
});
