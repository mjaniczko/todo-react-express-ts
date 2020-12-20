import cors from 'cors';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import todoRouter from './routes';

const app: Express = express();
app.use(cors());

const jsonParser = bodyParser.json();

app.use('/api/v1/todos', jsonParser, todoRouter);

export default app;
