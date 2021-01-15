import { Todo } from '../models/todo';
import { ITodo } from '../types/todo';
import { ApiError } from '../utils/ApiError';

export const getAllTodos = async (userId: string) => {
  try {
    return await Todo.find({ user: userId });
  } catch (err) {
    console.log(err);
    return ApiError.internal('Failed to fetch todos');
  }
};

export const deleteTodo = async (userId: string, todoId: string) => {
  try {
    const todo = await Todo.find({ user: userId, _id: todoId });
    if (todo.length === 0) {
      return ApiError.notFound('Todo with given id was not found for logged in user.');
    }
    const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(todoId);
    return deletedTodo;
  } catch (err) {
    console.log(err);
    return ApiError.internal('Failed to fetch todos');
  }
};

export const updateTodo = async (userId: string, todoId: string, body: {}) => {
  try {
    const todo = await Todo.find({ user: userId, _id: todoId });
    if (todo.length === 0) {
      return ApiError.notFound('Todo with given id was not found for logged in user.');
    }

    return await Todo.findOneAndUpdate({ _id: todoId }, body);
  } catch (err) {
    console.log(err);
    return ApiError.internal('Failed to update todos');
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
  } catch (err) {
    console.log(err);
    return ApiError.internal('Failed to create todos');
  }
};
