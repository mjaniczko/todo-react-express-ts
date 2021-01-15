import { Response, NextFunction } from 'express';

// import { Todo } from '../models/todo';
// import { ITodo } from '../types/todo';
import { ApiError } from '../utils/ApiError';
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
    next(ApiError.badRequest('Failed to fetch todos.'));
  }
};

const createTodo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const newTodo = await createTodoDB(req.user._id, req.body);
    res.status(201).json({ todo: newTodo });
  } catch (err) {
    console.log(err);
    next(ApiError.badRequest('Failed to create todo. Name and description are required.'));
  }
};

const deleteTodo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const deletedTodo = await deleteTodoDB(req.user._id, req.params.id);
    res.status(200).json({ deletedTodo });
  } catch (err) {
    console.log(err);
    next(ApiError.internal('Failed to delete todo.'));
  }
};

const updateTodo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    await updateTodoDB(req.user._id, req.params.id, req.body);
    res.status(200).json({ updatedTodo: { ...req.body } });
  } catch (err) {
    console.log(err);
    next(ApiError.internal('Failed to update todo.'));
  }
};

export { getTodos, createTodo, deleteTodo, updateTodo };
