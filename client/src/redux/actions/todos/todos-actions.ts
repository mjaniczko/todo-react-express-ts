import axios from 'axios';
import { Dispatch } from 'redux';

import { ITodo } from '../../../utils/interfaces';
import { FETCH_TODOS, CREATE_TODO, DELETE_TODO, UPDATE_TODO } from './action-types';

export const fetchTodosAction = (todos: ITodo[]) => ({
  type: FETCH_TODOS,
  payload: todos,
});

export const createTodoAction = (todo: ITodo) => ({
  type: CREATE_TODO,
  payload: todo,
});

export const deleteTodoAction = (id: string) => ({
  type: DELETE_TODO,
  payload: id,
});

export const updateTodoAction = (todo: ITodo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const fetchTodos = () => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/todos');
      const data = await res.data;
      dispatch(fetchTodosAction(data.todos));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const createTodo = (todo: { name: string; description: string }) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post('http://localhost:8000/api/v1/todos', todo);
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
