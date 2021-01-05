import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { todoRouter } from './routes/todo';
import { userRouter } from './routes/user';

export const app = express();
app.use(cors());

const jsonParser = bodyParser.json();

app.use((req: any, _res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/todos', jsonParser, todoRouter);
app.use('/api/v1/user', jsonParser, userRouter);
