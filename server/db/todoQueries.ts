import { Todo } from '../models/todo';
import { ITodo } from '../types/todo';
import { ErrorHandler } from '../utils/ErrorHandler';

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
    console.log('todo: ', todo);
    if (todo.length === 0) {
      throw new ErrorHandler(404, 'Todo with given id was not found for logged in user.');
    }
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(todoId);
    return deletedTodo;
  } catch {
    throw new ErrorHandler(500, 'Failed to delete todo');
  }
};

export const updateTodo = async (userId: string, todoId: string, body: {}) => {
  try {
    const todo = await Todo.find({ user: userId, _id: todoId });
    if (todo.length === 0) {
      throw new ErrorHandler(404, 'Todo with given id was not found for logged in user.');
    }

    return await Todo.findOneAndUpdate({ _id: todoId }, body);
  } catch {
    throw new ErrorHandler(500, 'Failed to update todos');
  }
};

export const createTodo = async (userId: string, body: { name: string; description: string }) => {
  try {
    const { name, description } = body;
    const todo = new Todo({
      name: name,
      description: description,
      user: userId,
    });

    return await todo.save();
  } catch {
    throw new ErrorHandler(500, 'Failed to create todo');
  }
};
