import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';

import { todoRouter } from './routes/todo';
import { userRouter } from './routes/user';
import { ErrorHandler } from './utils/ErrorHandler';

export const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/user', userRouter);

app.use((error: ErrorHandler, _req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(error.statusCode || 500).json({
    error: { message: error.message || 'Ups something went wrong. Please try again later.' },
  });
  next();
});
