import { Router } from 'express';

import { protect } from '../middlewares/authMiddleware';
import { getTodos, createTodo, deleteTodo, updateTodo } from '../controllers/todoController';

export const todoRouter: Router = Router();

todoRouter.use(protect);

todoRouter.get('/', getTodos);
todoRouter.post('/', createTodo);
todoRouter.put('/:id', updateTodo);
todoRouter.delete('/:id', deleteTodo);
