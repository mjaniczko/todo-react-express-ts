import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';

import { todoRouter } from './routes/todo';
import { userRouter } from './routes/user';

export const app = express();
app.use(cors());

const jsonParser = bodyParser.json();

app.use('/api/v1/todos', jsonParser, todoRouter);
app.use('/api/v1/user', jsonParser, userRouter);

app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({ error: { message: error.message } });
  next();
});
