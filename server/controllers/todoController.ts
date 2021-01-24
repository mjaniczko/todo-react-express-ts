import { Response, NextFunction } from 'express';

import { RequestWithUser } from '../types/shared';
import {
  getAllTodos,
  deleteTodo as deleteTodoDB,
  updateTodo as updateTodoDB,
  createTodo as createTodoDB,
} from '../db/todoQueries';

const getTodos = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const todos = await getAllTodos(req.user._id);
    res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};

const createTodo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const newTodo = await createTodoDB(req.user._id, req.body);
    res.status(201).json({ todo: newTodo });
  } catch (err) {
    next(err);
  }
};

const deleteTodo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const deletedTodo = await deleteTodoDB(req.user._id, req.params.id);
    res.status(200).json({ deletedTodo });
  } catch (err) {
    next(err);
  }
};

const updateTodo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    await updateTodoDB(req.user._id, req.params.id, req.body);
    res.status(200).json({ updatedTodo: { ...req.body } });
  } catch (err) {
    next(err);
  }
};

export { getTodos, createTodo, deleteTodo, updateTodo };
