import { Todo } from '../models/todo';
import { Todo as TodoType } from '../types/todo';
import { ErrorHandler, handleError } from '../utils/ErrorHandler';

export const getAllTodos = async (userId: string) => {
  try {
    return await Todo.find({ user: userId });
  } catch {
    throw new ErrorHandler(500, 'Failed to fetch todos');
  }
};

export const deleteTodo = async (userId: string, todoId: string) => {
  try {
    const todo = await Todo.find({ user: userId, _id: todoId });
    if (todo.length === 0) {
      throw new ErrorHandler(404, 'Todo with given id was not found for logged in user.');
    }
    const deletedTodo: TodoType | null = await Todo.findByIdAndRemove(todoId);
    return deletedTodo;
  } catch (err) {
    return handleError(err);
  }
};

export const updateTodo = async (userId: string, todoId: string, body: {}) => {
  try {
    const todo = await Todo.find({ user: userId, _id: todoId });
    if (todo.length === 0) {
      throw new ErrorHandler(404, 'Todo with given id was not found for logged in user.');
    }

    return await Todo.findOneAndUpdate({ _id: todoId }, body);
  } catch (err) {
    return handleError(err);
  }
};

export const createTodo = async (userId: string, body: { name: string; description: string }) => {
  try {
    const { name, description } = body;
    if (name.length === 0 || description.length === 0) {
      throw new ErrorHandler(404, 'Name and description are required');
    }

    const todo = new Todo({
      name: name,
      description: description,
      user: userId,
    });

    return await todo.save();
  } catch (err) {
    return handleError(err);
  }
};
