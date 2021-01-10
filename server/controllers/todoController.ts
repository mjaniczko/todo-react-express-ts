import { Response, NextFunction } from 'express';

import { ITodo } from '../types/todo';
import { Todo } from '../models/todo';
import { ApiError } from '../utils/ApiError';
import { RequestWithUser } from '../types/shared';

const getTodos = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json({ todos });
  } catch (_) {
    next(ApiError.badRequest('Failed to get todos.'));
  }
};

const createTodo = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const body = req.body;
    const todo = new Todo({
      name: body.name,
      description: body.description,
      user: req.user._id,
    });

    const newTodo = await todo.save();

    res.status(201).json({ message: 'Todo added', todo: newTodo });
  } catch (_) {
    next(ApiError.badRequest('Failed to create todo. Name and description are required.'));
  }
};

const deleteTodo = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    if (todos.filter((t) => t.id === req.params.id).length < 1) {
      next(ApiError.notFound('Todo with given id was not found for logged in user.'));
    } else {
      const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
      res.status(200).json({
        message: 'Todo deleted',
        todo: deletedTodo,
      });
    }
  } catch (_) {
    console.log('Filed to delete todo');
  }
};

const updateTodo = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    if (todos.filter((t) => t.id === req.params.id).length < 1) {
      next(ApiError.notFound('Todo with given id was not found for logged in user.'));
    } else {
      const updatedTodo: ITodo | null = await Todo.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json({
        message: 'Todo updated successfully',
        updatedTodo,
      });
    }
  } catch (_) {
    console.log('Filed to update todo');
  }
};

export { getTodos, createTodo, deleteTodo, updateTodo };
