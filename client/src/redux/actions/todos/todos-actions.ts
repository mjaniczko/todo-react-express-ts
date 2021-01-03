import axios from 'axios';
import { Dispatch } from 'redux';

import { ITodo } from '../../../interfaces/todo';

export enum TodoActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  CREATE_TODO = 'CREATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  RESET_TODOS = 'RESET_TODOS',
}

interface FetchTodos {
  type: TodoActionTypes.FETCH_TODOS;
  payload: ITodo[];
}

interface CreateTodo {
  type: TodoActionTypes.CREATE_TODO;
  payload: ITodo;
}

interface DeleteTodo {
  type: TodoActionTypes.DELETE_TODO;
  payload: ITodo['_id'];
}

interface UpdateTodo {
  type: TodoActionTypes.UPDATE_TODO;
  payload: ITodo;
}

interface ResetTodos {
  type: TodoActionTypes.RESET_TODOS;
}

export type TodoActions = FetchTodos | CreateTodo | DeleteTodo | UpdateTodo | ResetTodos;

export const fetchTodosAction = (todos: ITodo[]) => ({
  type: TodoActionTypes.FETCH_TODOS,
  payload: todos,
});

export const createTodoAction = (todo: ITodo) => ({
  type: TodoActionTypes.CREATE_TODO,
  payload: todo,
});

export const deleteTodoAction = (id: ITodo['_id']) => ({
  type: TodoActionTypes.DELETE_TODO,
  payload: id,
});

export const updateTodoAction = (todo: ITodo) => ({
  type: TodoActionTypes.UPDATE_TODO,
  payload: todo,
});

export const resetTodoAction = () => ({
  type: TodoActionTypes.RESET_TODOS,
});

export const fetchTodos = (userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/todos', {
        params: { user: userId },
      });
      const data = await res.data;
      dispatch(fetchTodosAction(data.todos));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const createTodo = (todo: { name: string; description: string }, userId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/todos', {
        ...todo,
        user: userId,
      });
      const data = await res.data;
      dispatch(createTodoAction(data.todo));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteTodo = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/todos/${id}`);
      dispatch(deleteTodoAction(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateTodo = (todo: ITodo) => {
  return async (dispatch: Dispatch) => {
    try {
      const newStatus = !todo.status;
      await axios.put(`http://localhost:8000/api/v1/todos/${todo._id}`, {
        ...todo,
        status: newStatus,
      });

      dispatch(updateTodoAction({ ...todo, status: newStatus }));
    } catch (err) {
      console.log(err);
    }
  };
};
