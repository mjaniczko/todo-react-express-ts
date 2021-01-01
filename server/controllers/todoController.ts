import { Response, Request } from 'express';
import { ITodo } from '../types/todo';
import Todo from '../models/todo';

declare module 'express' {
  interface Request {
    myProperty: string;
  }
}

const getTodos = async (req: any, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.query.user });

    res.status(200).json({ todos });
  } catch (error) {
    throw error;
  }
};

const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<ITodo, 'name' | 'description' | 'status' | 'user'>;
    const todo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
      user: body.user,
    });

    const newTodo = await todo.save();

    res.status(201).json({ message: 'Todo added', todo: newTodo });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
    res.status(200).json({
      message: 'Todo deleted',
      todo: deletedTodo,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedTodo: ITodo | null = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: 'Todo updated successfully',
      status: 'success',
      updatedTodo,
    });
  } catch (err) {
    console.log(err);
  }
};

export { getTodos, createTodo, deleteTodo, updateTodo };
