import cors from 'cors';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import todoRouter from './routes/todo';
import userRouter from './routes/user';

const app: Express = express();
app.use(cors());

const jsonParser = bodyParser.json();

// Test middleware
app.use((req: any, _res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

app.use('/api/v1/todos', jsonParser, todoRouter);
app.use('/api/v1/user', jsonParser, userRouter);

export default app;
