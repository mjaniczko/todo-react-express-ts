import axios from 'axios';
import { Dispatch } from 'redux';

import { Todo } from '../../../types/interfaces';
import { getLocalStorageUserToken } from '../../../utils/auth';

export enum TodoActionTypes {
  FETCH_TODOS = 'FETCH_TODOS',
  CREATE_TODO = 'CREATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  RESET_TODOS = 'RESET_TODOS',
  TODOS_ERROR = 'TODOS_ERROR',
}

interface FetchTodos {
  type: TodoActionTypes.FETCH_TODOS;
  payload: Todo[];
}

interface CreateTodo {
  type: TodoActionTypes.CREATE_TODO;
  payload: Todo;
}

interface DeleteTodo {
  type: TodoActionTypes.DELETE_TODO;
  payload: Todo['_id'];
}

interface UpdateTodo {
  type: TodoActionTypes.UPDATE_TODO;
  payload: Todo;
}

interface ResetTodos {
  type: TodoActionTypes.RESET_TODOS;
}

interface TodosError {
  type: TodoActionTypes.TODOS_ERROR;
  payload: string;
}

export type TodoActions =
  | FetchTodos
  | CreateTodo
  | DeleteTodo
  | UpdateTodo
  | ResetTodos
  | TodosError;

export const fetchTodosAction = (todos: Todo[]) => ({
  type: TodoActionTypes.FETCH_TODOS,
  payload: todos,
});

export const createTodoAction = (todo: Todo) => ({
  type: TodoActionTypes.CREATE_TODO,
  payload: todo,
});

export const deleteTodoAction = (id: Todo['_id']) => ({
  type: TodoActionTypes.DELETE_TODO,
  payload: id,
});

export const updateTodoAction = (todo: Todo) => ({
  type: TodoActionTypes.UPDATE_TODO,
  payload: todo,
});

export const resetTodoAction = () => ({
  type: TodoActionTypes.RESET_TODOS,
});

export const todosActionError = (error: string) => ({
  type: TodoActionTypes.TODOS_ERROR,
  payload: error,
});

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getLocalStorageUserToken();
      const res = await axios.get('http://localhost:8000/api/v1/todos', {
        headers: {
          Authorization: token,
        },
      });
      const data = await res.data;
      dispatch(fetchTodosAction(data.todos));
    } catch (error) {
      // console.log(error.response);
      dispatch(todosActionError(error.response.data.error.message));
    }
  };
};

export const createTodo = (todo: { name: string; description: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getLocalStorageUserToken();
      const res = await axios.post(
        'http://localhost:8000/api/v1/todos',
        {
          ...todo,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await res.data;
      dispatch(createTodoAction(data.todo));
    } catch (error) {
      // console.log(error.response);
      dispatch(todosActionError(error.response.data.error.message));
    }
  };
};

export const deleteTodo = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getLocalStorageUserToken();
      await axios.delete(`http://localhost:8000/api/v1/todos/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(deleteTodoAction(id));
    } catch (error) {
      // console.log(error.response);
      dispatch(todosActionError(error.response.data.error.message));
    }
  };
};

export const updateTodo = (todo: Todo) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = getLocalStorageUserToken();
      await axios.put(`http://localhost:8000/api/v1/todos/${todo._id}`, todo, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(updateTodoAction(todo));
    } catch (error) {
      // console.log(error.response);
      dispatch(todosActionError(error.response.data.error.message));
    }
  };
};
