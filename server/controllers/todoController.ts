import { Response } from 'express';

import { ITodo } from '../types/todo';
import { Todo } from '../models/todo';

const getTodos = async (req: any, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createTodo = async (req: any, res: Response): Promise<void> => {
  try {
    const body = req.body;
    const todo = new Todo({
      name: body.name,
      description: body.description,
      user: req.user._id,
    });

    const newTodo = await todo.save();

    res.status(201).json({ message: 'Todo added', todo: newTodo });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (req: any, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    if (todos.filter((t) => t.id === req.params.id).length < 1) {
      res.status(404).json({ message: 'Todo with given id was not found for logged in user.' });
    } else {
      const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
      res.status(200).json({
        message: 'Todo deleted',
        todo: deletedTodo,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (req: any, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user._id });

    if (todos.filter((t) => t.id === req.params.id).length < 1) {
      res.status(404).json({ message: 'Todo with given id was not found for logged in user.' });
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
  } catch (err) {
    console.log(err);
  }
};

export { getTodos, createTodo, deleteTodo, updateTodo };
